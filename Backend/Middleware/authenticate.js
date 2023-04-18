const passport = require('passport')

const authenticate = (req, res, next) => {
  passport.authenticate('jwt', function (err, user) {
    if (err) return next(err)
    console.log(user)

    if (!user) {
      res.clearCookie('jwt')
      return res.status(401).json({ msg: 'Unauthorized Access' })
    }

    req.user = user
    console.log('here')

    next()
  })(req, res, next)
}

module.exports = authenticate
