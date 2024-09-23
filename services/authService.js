const admin = require("firebase-admin");

const serviceAccount = require(process.env.GOOGLE_SERVICE_ACCOUNT_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.decodeGoogleToken = async token => {
  const decodedToken = await admin.auth().verifyIdToken(token);

  return decodedToken;
};
