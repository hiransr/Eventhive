const speakeasy = require('speakeasy')
const db = require('../Config/DB')
const { ROLE } = require('../Constants/role')
const { hashPassword, comparePassword } = require('../utils/password')
const { v4: UUID4 } = require('uuid')
const { generateJwt } = require('../utils/jwt')
exports.signup = async (req, res) => {
  const connection = db.getConnection()
  const data = req.body
  try {
    const typeId = ROLE[data.accountType.toUpperCase()]
    console.log(req.body, typeId)
    if (!typeId) {
      return res.status(404).send({ msg: 'Invalid Account Type' })
    }
    const [
      row,
      _,
    ] = await connection.execute(
      'select * from signup_table where username=?',
      [data.email],
    )
    console.log(row, _)
    if (row.length) {
      return res.status(409).send({ msg: 'User Already Exist' })
    }
    const userId = UUID4()
    console.log(userId)
    await connection.execute(
      `INSERT into signup_table (auth_id,username,password,type_id) VALUES (?,?,?,?)`,
      [userId, data.email, hashPassword(data.pass), typeId],
    )
    if (typeId == ROLE['USER']) {
      await connection.execute(
        `INSERT into user (auth_id,name,phone,dob,profile,org_name,city,state,country,pin_code) VALUES (?,?,?,?,?,?,?,?,?,?)`,
        [
          userId,
          data.name,
          data.ph_no,
          data.dob,
          data.profile,
          data.org,
          data.city,
          data.state,
          data.country,
          data.pin_code,
        ],
      )
      return res.send({ msg: 'Successfully Signed Up' })
    } else {
      var secret = speakeasy.generateSecret()

      await connection.execute(
        `INSERT into college_admin (auth_id,college_name,phone,city,state,country,pin_code,totp) VALUES (?,?,?,?,?,?,?,?)`,
        [
          userId,
          data.collegeName,
          data.ph_no,
          data.city,
          data.state,
          data.country,
          data.pin_code,
          secret.base32,
        ],
      )
      return res.send({
        totp: secret.base32,
        totp_url: secret.otpauth_url,
        msg: 'Successfully Signed Up',
      })
    }
  } catch (e) {
    await connection.execute(
      `delete st from signup_table as st left join ${
        data.accountType == 'user' ? 'user' : 'college_admin'
      } as ca on st.auth_id = ca.auth_id where type_id = ? and ca.auth_id is null; `,
      [ROLE[data.accountType.toUpperCase()]],
    )
    console.log(e)
    return res.status(500).send({ msg: 'Internal Server Error' })
  }
  // return res.send('success')
}
exports.verifyTOTP = async (req, res) => {
  const data = req.body
  const connection = db.getConnection()
  console.log(req.body)
  try {
    const [
      totp,
      _,
    ] = await connection.execute(
      `SELECT college_admin.totp from college_admin inner join signup_table on signup_table.auth_id=college_admin.auth_id where signup_table.username=?`,
      [data.email],
    )
    var verified = speakeasy.totp.verify({
      secret: totp[0].totp,
      encoding: 'base32',
      token: data.totp,
    })
    if (verified) {
      // await connection.execute(
      //   `update signup_table set isVerified=1 where username=?`,
      //   [data.email],
      // )//to verify cadmin before login
      if (data.isLogin) {
        const jsonToken = generateJwt({
          id: data.auth_id,
          type_id: ROLE['CADMIN'],
        })
        res.cookie('jwt', jsonToken, {
          secure: true,
          sameSite: 'none',
          httpOnly: true,
        })
      }
      return res.send({ msg: 'Successfully Verified' })
    }
    return res.status(404).send({ msg: 'Invalid TOTP' })
  } catch (e) {
    console.log(e)
    return res.status(500).send({ msg: 'Internal Server Error' })
  }
  //returns list [row,field]
}

exports.login = async (req, res) => {
  const data = req.body
  console.log(req.body)
  const connection = db.getConnection()
  try {
    const [
      user,
    ] = await connection.execute(
      `select * from signup_table where username=?`,
      [data.email],
    )
    console.log(user)
    if (user.length == 0 || !comparePassword(data.pass, user[0].password)) {
      return res.status(404).send({ msg: 'Invalid Username or Password' })
    }
    const jsonToken = generateJwt({
      id: user[0].auth_id,
      type_id: user[0].type_id,
    })
    if (user[0].type_id == ROLE['CADMIN']) {
      const [
        cadmin,
      ] = await connection.execute(
        `select * from college_admin where auth_id=?`,
        [user[0].auth_id],
      )
      if (!cadmin[0].isVerified) {
        return res.status(403).send({ msg: 'Your Account is Under Review' })
      }
    }
    res.cookie('jwt', jsonToken, {
      secure: true,
      sameSite: 'none',
      httpOnly: true,
    })
    return res.send({
      msg: 'Successfully Logged In',
      accountType: user[0].type_id,
      auth: user[0].auth_id,
    })
  } catch (e) {
    console.log(e)
    return res.status(500).send({ msg: 'Internal Server Error' })
  }
}

exports.verifyLogin = async (req, res) => {
  res.set('Cache-control', `no-store`)
  return res.status(200).send(req.user)
}
exports.isAuthorised = async (req, res) => {
  console.log(req.body)
  if (req.user.type_id !== req.body.type) {
    return res.status(403).send({ msg: 'Invalid User', type: req.user.type_id })
  }
  res.send({ msg: 'Verified' })
}

exports.logout = (req, res) => {
  res.clearCookie('jwt')
  return res.send({ msg: 'success' })
}
