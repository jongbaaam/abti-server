const { v4: uuidv4 } = require("uuid");

const User = require("../model/User");

exports.upsertUserByToken = async ({
  email: userEmail,
  name: userName,
  picture: photoUrl,
}) => {
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
};
