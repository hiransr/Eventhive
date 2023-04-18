const express = require('express')
const upload = require('../utils/storage')
const {
  createEvent,
  getMyEvents,
  deleteEvent,
  getRSVPData,
} = require('../Controller/cadmin')
const authenticate = require('../Middleware/authenticate')
const router = express.Router()
router.post(
  '/create-new-event',
  authenticate,
  upload.single('img_name'),
  createEvent,
)
router.get('/get-my-events', authenticate, getMyEvents)
router.delete('/delete-my-event', authenticate, deleteEvent)
router.get('/get-rsvp-data', authenticate, getRSVPData)
module.exports = router
