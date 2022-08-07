const express = require('express')

const router = express.Router()


//user related
router.use(require('./user'))
//role related
router.use('/roles', require('./role'))

module.exports = router
