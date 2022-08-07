const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

let { PRIVATE_KEY } = process.env;
PRIVATE_KEY = Buffer.from(PRIVATE_KEY, 'base64').toString();

exports.signToken = (payload) => {
  //sign token
  const token = jwt.sign(payload, PRIVATE_KEY , { algorithm: 'RS256', expiresIn: "2h" });

  return token
}

