require('dotenv/config');
const config = require("../../config");
const {sign, verify} = require('jsonwebtoken')
const secretKey = config.JWT_SECRET_KEY
const expiresIn = config.JWT_EXPIRES_IN 

const createToken = (payload) => sign({payload}, secretKey, {expiresIn});
const checkToken = (token, callback) => verify(token, secretKey, callback);

module.exports = {
    createToken,
    checkToken
}