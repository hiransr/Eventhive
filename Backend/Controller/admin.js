const db = require('../Config/DB')
exports.getCadminData = async (req, res) => {
  const connection = db.getConnection()
  const data = req.body
  try {
    const [cadmin] = await connection.execute(
      `SELECT st.username,phone,college_name,isVerified,st.auth_id from signup_table as st inner join college_admin as ca on st.auth_id = ca.auth_id`,
    )
    return res.send({ cadmin })
  } catch (e) {
    console.log(e)
    return res.status(500).send({ msg: 'Internal Server Error' })
  }
}

exports.modifyCadmin = async (req, res) => {
  const connection = db.getConnection()
  try {
    await connection.execute(
      `update college_admin set isVerified=? where auth_id=?`,
      [req.body.value, req.body.auth_id],
    )
    return res.send({ auth_id: req.body.auth_id })
  } catch (e) {
    console.log(e)
    return res.status(500).send({ msg: 'Internal Server Error' })
  }
}
