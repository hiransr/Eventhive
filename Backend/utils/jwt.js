const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
module.exports.generateJwt = function (data) {
  let payload = data
  console.log('payload- ', payload)

  const jwtToken = jwt.sign(payload, process.env['JWT_SECRET'], {
    expiresIn: 24 * 60 * 60,
  })

  return jwtToken
}
