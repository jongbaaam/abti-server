const authService = require("../services/authService");
const userService = require("../services/userService");

const ERROR_CASE = require("../constants/errorCase");

exports.logInAndUpsertUserByIdToken = async (req, res, next) => {
  try {
    const { idToken } = req.body;
    const decodedIdToken = await authService.decodeGoogleToken(idToken);
    const registeredUser = await userService.upsertUserByToken(decodedIdToken);

    res.json({ userInfo: registeredUser });
  } catch (error) {
    next(ERROR_CASE.FAILED_LOGIN);
  }
};
