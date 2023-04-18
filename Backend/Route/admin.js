const express = require('express')
const { getCadminData, modifyCadmin } = require('../Controller/admin')
const router = express.Router()
router.get('/get-college-admin', getCadminData)
router.post('/modify-college-admin', modifyCadmin)
module.exports = router
