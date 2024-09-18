require("dotenv").config();

const CONFIG = {
  DATABASE_URL: process.env.DATABASE_URL,
};

module.exports = CONFIG;
