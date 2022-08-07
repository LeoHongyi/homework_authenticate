const express = require('express')
const roleCtrl = require('../controller/role')
const roleMiddleware = require('../middleware/role')
const userMiddleware = require('../middleware/user')
const router = express.Router()

//create role
router.post('/', roleMiddleware.validateRoleData ,roleCtrl.createRole)
//delete role
router.delete('/:roleName', roleCtrl.deleteRole)
//check role
router.post('/role', userMiddleware.authenticate,roleCtrl.checkRole)
//all roles
router.post('/allroles', userMiddleware.authenticate, roleCtrl.allRoles)

module.exports = router
