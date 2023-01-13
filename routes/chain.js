const express = require('express')
const router = express.Router()

const {
    getService, createService, updateChannelName
} = require('../controllers/chain')

router.get('/', getService)
router.post('/', createService)
router.post('/updateChannelName', updateChannelName)

module.exports = router
