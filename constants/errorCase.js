const ERROR_CASE = {
  INVALID_TOKEN: {
    status: 401,
    message: "유효하지 않은 토큰입니다.",
  },
  SERVER_ERROR: {
    status: 500,
    message: "내부 서버 오류가 발생하였습니다.",
  },
  FAILED_LOGIN: {
    status: 401,
    message: "로그인에 실패하였습니다.",
  },
  NOT_FOUND: {
    status: 404,
    message: "Not Found",
  },
};

module.exports = ERROR_CASE;
