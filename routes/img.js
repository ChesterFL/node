const express = require('express')
const router = express.Router()

const {
    getImg
} = require('../controllers/img')
const {protect} = require("../middleware/auth");

router.use(protect);

router.get('/:id', getImg)

module.exports = router
