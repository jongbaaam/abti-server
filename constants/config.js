require("dotenv").config();

const CONFIG = {
  DATABASE_URL: process.env.DATABASE_URL,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
  SERVER_DOMAIN: process.env.SERVER_DOMAIN,
};

module.exports = CONFIG;
