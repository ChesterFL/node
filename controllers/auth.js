const crypto = require('crypto')
const web3Utils = require("web3-utils");
const path = require('path')
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const {customAlphabet} = require('nanoid/async')
const nanoid = customAlphabet('6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz', 10)



