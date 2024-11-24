const authService = require("../services/authService");
const userService = require("../services/userService");

const ERROR_CASE = require("../constants/errorCase");
const { SERVER_DOMAIN } = require("../constants/config");

exports.logInByIdToken = async (req, res, next) => {
  try {
    const { idToken } = req.body;
    const decodedIdToken = await authService.decodeGoogleToken(idToken);

    const registeredUser = await userService.createUserByToken(decodedIdToken);

    res.cookie("idToken", idToken, {
      secure: true,
      httpOnly: true,
      domain: SERVER_DOMAIN,
    });

    res.json({ userInfo: registeredUser });
  } catch (error) {
    next(ERROR_CASE.FAILED_LOGIN);
  }
};
