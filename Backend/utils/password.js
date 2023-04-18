const bcrypt = require('bcrypt')
require('dotenv').config()
exports.hashPassword = (password) => {
  console.log(process.env.SALTROUNDS)
  return bcrypt.hashSync(password, 10)
}
exports.comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword)
}

// console.log(process.env) // remove this after you've confirmed it is working
