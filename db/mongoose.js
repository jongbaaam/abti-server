const mongoose = require("mongoose");
const { DATABASE_URL } = require("../constants/config");

async function connectDataBase() {
  try {
    await mongoose.connect(DATABASE_URL);

    console.log("DB 연결 성공");
  } catch (err) {
    console.error(`DB 연결 실패 : ${err}`);
  }
}

module.exports = connectDataBase;
