require('dotenv').config();
const config = {
  port: +process.env.PORT || 3131,
  JWT_SECRET_KEY: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  DB_URL: process.env.DB_URL,
  DB_PORT: process.env.DB_PORT
};

module.exports = config;
