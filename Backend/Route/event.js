const express = require('express')
const {
  getEventData,
  getEventDetails,
  rsvpData,
  getTrendingData,
  likeData,
  getPreviousData,
  getFilterData,
} = require('../Controller/event')
const authenticate = require('../Middleware/authenticate')
// authenticate
const router = express.Router()
router.get('/get-event-all', authenticate, getEventData)
router.get('/get-event-detail', authenticate, getEventDetails)
router.post('/rsvp-data', authenticate, rsvpData)
router.post('/like-data', authenticate, likeData)
router.get('/get-trending-data', authenticate, getTrendingData)
router.get('/get-previous-data', authenticate, getPreviousData)
router.get('/get-filter-data', authenticate, getFilterData)
module.exports = router
