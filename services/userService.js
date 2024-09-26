const { v4: uuidv4 } = require("uuid");

const User = require("../model/User");

exports.createUserByToken = async ({
  email: userEmail,
  name: userName,
  picture: photoUrl,
}) => {
  const registeredUser = await User.findOne({
    userEmail,
  });

  if (registeredUser) {
    return registeredUser;
  }

  return await new User({
    userEmail,
    userName,
    photoUrl,
    apiKey: uuidv4(),
  }).save();
};
