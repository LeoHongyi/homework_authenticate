const dbUser = require('../app')
const tokenList = require('../app')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

let { PUBLIC_KEY } = process.env;
PUBLIC_KEY = Buffer.from(PUBLIC_KEY, 'base64').toString();
//valiate user
exports.validateUserData = (req, res, next) => {
  //prepare data
  const { username, password } = req.body;
  //validation
  if (!username) {return next(new Error('NAME_IS_REQUIRED'), res.statusCode = 400)}
  if (!password) return next(new Error('PASSWORD_IS_REQUIRED'));
  //if exists
  const user = dbUser.dbUser.filter(user => user.username == username)
  if (user && user.length > 0) return next(new Error('USER_ALREADY_EXIST'));
  next()
}

//hash the password
exports.hashPassword = async (req, res, next) => {
  const { password } = req.body;
  req.body.password = await bcrypt.hash(password, 10);
  next();
}

//validate add user role data
exports.validateUserRoleData = (req, res, next) => {
  const { username, roleName } = req.body;
  if (!username) return next(new Error('NAME_IS_REQUIRED'));
  if (!roleName) return next(new Error('ROLENAME_IS_REQUIRED'));
  const user = dbUser.dbUser.filter(user => user.username === username)
  if (!user[0].roles) { user[0].roles =  [] }
  const userContainsRole = user[0].roles.filter(role => role.roleName == roleName)
  console.log('userContainsRole', userContainsRole)
  if (userContainsRole && userContainsRole.length > 0) return next(new Error('ALREADY_ADDED_ROLE')); //nothing happen
  next()
}

//validate user login data
exports.validateLoginData = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username) return next(new Error('NAME_IS_REQUIRED'));
  if (!password) return next(new Error('PASSWORD_IS_REQUIRED'));
  //if not exists
  const user = dbUser.dbUser.filter(user => user.username == username)
  if (!user || !user[0]) return next(new Error('USER_NOT_EXIST'));
  const matched = await bcrypt.compare(password, user[0].password);
  if (!matched) return next(new Error('PASSWORD_DOES_NOT_MATCH'));
  next()
}

exports.authenticate = (req, res, next) => {
    // get Authorization header
  const authorization = req.header('Authorization');
  if (!authorization) return next(new Error('NOT_AUTHORIZED'));
    // get token from header
  const token = authorization.replace('Bearer ', '');
  if (!token) {
    return next(new Error('NO_TOKEN_FOUND'))
  }
  try {

    if (tokenList.tokenList.has(token)) {
      const decoded = jwt.verify(token, PUBLIC_KEY, {
        algorithms: ['RS256'],
      })
      req.body.username = decoded.username
    } else {
      return next(new Error('TOKEN_IS_NOT_VALID'))
    }

    next()
  } catch (e) {
    return res.status(401).json({
      error: e.message
    }).end()
  }

}
