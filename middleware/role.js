const dbRole = require('../app')
exports.validateRoleData = (req, res, next) => {
  const { roleName } = req.body;
  if (!roleName) { return next(new Error('ROLE_NAME_IS_REQUIRED')); }
  const role = dbRole.dbRole.filter(role => role.roleName == roleName)
  if (role && role.length > 0) return next(new Error('ROLE_ALREADY_EXIST'));
  next()
}
