const util = require('util')

module.exports = () => {
  const errorMessage = ["ROLE_NAME_IS_REQUIRED", "NAME_IS_REQUIRED","PASSWORD_DOES_NOT_MATCH","USER_NOT_EXIST","PASSWORD_IS_REQUIRED","USER_ALREADY_EXIST","NAME_IS_REQUIRED","ROLENAME_IS_REQUIRED","ALREADY_ADDED_ROLE"];
  return (err, req, res, next) => {
    let status = 500
    if (errorMessage.includes(err.message)) {
      status = 400
    }
    if (err.message === 'TOKEN_IS_NOT_VALID') {
      status = 401
    }
    if (err.message === 'NOT_AUTHORIZED') {
      status = 400
    }
    res.status(status).json({
      error: err.message,
    })
  }
}
