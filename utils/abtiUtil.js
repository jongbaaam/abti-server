const { validate: userIdValidate, version: userIdVersion } = require("uuid");

exports.getDistributeGroup = userId => {
  const HASH_VALUE_MAX = 10000;
  const DISTRIBUTION_STANDARD_VALUE = 5000;

  const hashValue = getHashValue(userId, HASH_VALUE_MAX);
  const distributedGroup = hashValue > DISTRIBUTION_STANDARD_VALUE ? "A" : "B";

  return distributedGroup;
};

exports.validationUserId = userId => {
  return userIdValidate(userId) && userIdVersion(userId) === 4;
};

exports.getExpirationDate = days => {
  const ONE_DAY_MILLISECOND = 24 * 60 * 60 * 1000;
  const ExpirationDate = new Date();

  ExpirationDate.setTime(ExpirationDate.getTime() + days * ONE_DAY_MILLISECOND);

  return ExpirationDate;
};

function getHashValue(str, max) {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash = hash & hash;
    hash = Math.abs(hash);
  }

  return hash % max;
}
