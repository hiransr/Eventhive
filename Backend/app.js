const express = require('express')
const passport = require('passport')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')

// const { db } = require('./Config/DB')
dotenv.config() //to load env
const app = express()
const initPassport = require('./Middleware/jwt')
initPassport(passport, process.env.JWT_SECRET)

// const DBConnection = connection
// connection.connect()
// db.createConnection()
var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  exposedHeaders: ['Set-Cookie'],
}

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/eventImage', express.static('public/eventImage'))

// Server status
app.get('/api/status', (req, res) => {
  res.json({ message: 'Server is running' })
})
const eventRouter = require('./Route/event')
app.use('/api/events', eventRouter)
const authRouter = require('./Route/auth')
app.use('/api', authRouter)
const adminrouter = require('./Route/admin')
app.use('/api/admin', adminrouter)
const cadminRouter = require('./Route/cadmin') //append this with route.js
app.use('/api/cadmin', cadminRouter)

// app.post('/api/')
// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
