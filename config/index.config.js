const dotenv = require("dotenv");

//% Initializing dotenv config
dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  MY_EMAIL: process.env.MY_EMAIL,
  MY_PASSWORD: process.env.MY_PASSWORD,
  BASE_URL: process.env.BASE_URL,
};
