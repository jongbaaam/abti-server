const ERROR_CASE = require("../constants/errorCase");
const authService = require("../services/authService");

exports.isLoggedIn = async (req, res, next) => {
  try {
    const { idToken } = req.cookies;

    await authService.decodeGoogleToken(idToken);

    next();
  } catch (error) {
    next(ERROR_CASE.INVALID_TOKEN);
  }
};
