const express = require('express')
const userCtrl = require('../controller/user')
const userMiddleware = require('../middleware/user')
const router = express.Router()


//create user
router.post('/users', userMiddleware.validateUserData, userMiddleware.hashPassword ,userCtrl.register)

//delete user
router.delete('/users/:username', userCtrl.delete)

//add role to user
router.post('/useraddrole', userMiddleware.validateUserRoleData, userCtrl.addUserRole)


//authenticate user
router.post('/authenticate', userMiddleware.validateLoginData, userMiddleware.hashPassword, userCtrl.authenticate)

//invalidate
router.post('/invalidate', userMiddleware.authenticate, userCtrl.invalidate)


module.exports = router
