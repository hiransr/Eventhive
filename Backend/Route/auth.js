const express = require('express')
const {
  signup,
  verifyTOTP,
  login,
  verifyLogin,
  isAuthorised,
  logout,
} = require('../Controller/auth')
const authenticate = require('../Middleware/authenticate')
const router = express.Router()
router.post('/signup', signup)
router.post('/verifytotp', verifyTOTP)
router.post('/login', login)
router.get('/verifylogin', authenticate, verifyLogin)
router.post('/verifyuser', authenticate, isAuthorised)
router.get('/logout', authenticate, logout)
module.exports = router
