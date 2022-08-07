const dbRole = require('../app')
const dbUser = require('../app')
exports.createRole = (req, res, next) => {
  try {
    const { roleName } = req.body;
    dbRole.dbRole.push({
      roleName: roleName
    })
    res.status(201).json({
      message: 'created role successfully'
    })
  } catch (err) {
    next(err)
  }
}

exports.deleteRole = (req, res, next) => {
  try {
    const { roleName } = req.params;
    const index = dbRole.dbRole.findIndex(role => role.roleName == roleName)
    if (index == -1) {
      return next(new Error('TO_DELETE_ROLE_NOT_EXIST'));
    } else {
      dbRole.dbRole = dbRole.dbRole.splice(index, 1)
    }
    res.status(200).json({
      message: 'delete role successfully'
    })
  } catch (err) {
    next(err)
  }
}

exports.checkRole = (req, res, next) => {
  try {
    const { username, roleName } = req.body
    const user = dbUser.dbUser.filter(user => user.username === username)
    let message = ''
    if (!user || user.length == 0) {
      message = `{username} does not exist`
    }
    if (!user[0].roles || user[0].roles.length == 0) {
      message = `{username} does not have any roles`
    }
    const match = user[0].roles.filter(role => role.roleName === roleName)
    if (match[0] && match.length > 0) {
      message = `${roleName} belongs to ${username}`
    }
    res.status(200).json({
      "message": message
    })
  } catch (err) {
    next(err)
  }
}

exports.allRoles = (req, res, next) => {
  try {
    const { username } = req.body
    const user = dbUser.dbUser.filter(user => user.username === username)
    let result = []
    let message = ''
    if (!user || user.length == 0) {
      message = `{username} does not exist`
    }
    if (!user[0].roles || user[0].roles.length == 0) {
      message = `{username} does not have any roles`
    }
    result = user[0].roles
    if (result.length > 0) {
      message = 'query all roles successfully'
    }
    res.status(200).json({
      "message": message,
      "result": result
    })
  } catch (err) {
    next(err)
  }
}
