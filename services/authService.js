const admin = require("firebase-admin");

const ERROR_CASE = require("../constants/errorCase");
const serviceAccount = require(process.env.GOOGLE_SERVICE_ACCOUNT_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.decodeGoogleToken = async token => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    return decodedToken;
  } catch (error) {
    throw ERROR_CASE.INVALID_TOKEN;
  }
};
