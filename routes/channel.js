const express = require('express')
const router = express.Router()

const {
    getInfo, create, updateInfo
} = require('../controllers/channel')

// const { protect } = require('../middleware/auth')

router.route('/:address')
    .get(getInfo)
    .put(updateInfo)


router.route('/')
    .post(create)


module.exports = router
