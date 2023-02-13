const express = require('express')
const router = express.Router()
const asyncHandler = require("../middleware/async");
const {protect} = require("../middleware/auth");

const {
    getInfo, create, updateInfo, uploadAvatarOrBanner
} = require('../controllers/channel')


router.use(protect)

router.route('/')
    .post(create)
    .get(getInfo)
    .put(updateInfo)

router.route('/avatar')
    .put(uploadAvatarOrBanner)
router.route('/banner')
    .put(
        asyncHandler(async (req, res, next) => {
            req.query.isBanner = true;
            next();
        }),
        uploadAvatarOrBanner)


module.exports = router
