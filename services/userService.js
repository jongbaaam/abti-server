const { v4: uuidv4 } = require("uuid");

const User = require("../model/User");
const ERROR_CASE = require("../constants/errorCase");

exports.upsertUserByToken = async ({
  email: userEmail,
  name: userName,
  picture: photoUrl,
}) => {
  try {
    const upsertUser = await User.findOneAndUpdate(
      {
        userEmail,
      },
      {
        userEmail,
        userName,
        photoUrl,
        apiKey: uuidv4(),
      },
      {
        returnDocument: "after",
        upsert: true,
        new: true,
      },
    ).lean();

    return upsertUser;
  } catch {
    throw new Error(ERROR_CASE.SERVER_ERROR);
  }
};
