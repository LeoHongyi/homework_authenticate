const dbUser = require('../app')
const tokenList = require('../app')
const userService = require('../service/user')
const util = require('util')
exports.register = (req, res, next) => {
  try {
    dbUser.dbUser.push({
      username: req.body.username,
      password: req.body.password
    })
    console.log('dbUser', dbUser.dbUser)
    res.status(201).json({
      message: 'created user successfully'
    })
  } catch (err) {
    next(err)
  }
}

exports.delete = (req, res, next) => {
  try {
    const { username } = req.params;
    const index = dbUser.dbUser.findIndex(user => user.username == username)
    if (index == -1) {
      return next(new Error('TO_DELETE_USER_NOT_EXIST'));
    } else {
      dbUser.dbUser = dbUser.dbUser.splice(index, 1)
    }
    res.status(200).json({
      message: 'delete user successfully'
    })
  } catch (err) {
    next(err)
  }
}

exports.addUserRole = (req, res, next) => {
  try {
    const { username, roleName } = req.body;
    const index = dbUser.dbUser.findIndex(user => user.username == username)
    if (index == -1) {
      return next(new Error('TO_ADD_ROLE_USER_NOT_EXIST'));
    } else {
      if (!dbUser.dbUser[index].roles) {
        dbUser.dbUser[index].roles = []
      }
      dbUser.dbUser[index].roles.push({roleName: roleName})
    }
    console.log(dbUser.dbUser)
    res.status(200).json({
      message: 'add role successfully'
    })
  } catch (err) {
    next(err)
  }
}

exports.authenticate = (req, res, next) => {
  try {
    const { username } = req.body
    const token = userService.signToken({ username })
    if (!tokenList.tokenList.has(token)) {
      tokenList.tokenList.add(token)
    }
    res.status(200).json({
      token
    })
  } catch (err) {
    next(err)
  }
}

exports.invalidate = (req, res, next) => {
  try {
    const { username } = req.body
    const authorization = req.header('Authorization');
    const token = authorization.replace('Bearer ', '');
    if (tokenList.tokenList.has(token)) {
      tokenList.tokenList.delete(token)
    }
    res.status(200).json({
      "message": `${username} token invalidated successfully`
    })
  } catch (err) {
    res.status(401).json({
      error: util.format(err)
    }).end()
  }
}
