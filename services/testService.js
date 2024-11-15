const Test = require("../model/Test");
const TRACK_RESULT_MESSAGE = require("../constants/trackResultMessage");
const { TRACK_TYPE } = require("../constants/constant");

exports.getTestListByProjectId = async projectId => {
  const testListByProjectId = await Test.find({
    projectId,
  });

  return testListByProjectId;
};

exports.findTestByTestId = async testId => {
  const foundTest = await Test.findById(testId);

  return foundTest;
};

exports.createTestByProjectId = async ({ projectId, testFormData }) => {
  const createdTest = await new Test({
    ...testFormData,
    projectId,
  }).save();

  return createdTest;
};

exports.deleteTestByTestId = async testId => {
  await Test.findByIdAndDelete(testId);
};

exports.increaseSpecimenStatisticsByGroupName = async ({
  testId,
  abtiUserId,
  groupName,
  action,
}) => {
  const { type, value } = action;
  const foundTest = await Test.findById(testId);
  let targetProperty;

  const targetParticipant = foundTest.testParticipants.find(participant => {
    return participant.userId === abtiUserId;
  });

  const targetGroup = foundTest.specimenStatistics.find(element => {
    return element.groupName === groupName;
  });

  switch (type) {
    case TRACK_TYPE.VISITATION:
      if (targetParticipant) {
        return TRACK_RESULT_MESSAGE.PARTICIPATED_USER;
      }

      foundTest.testParticipants.push({
        userId: abtiUserId,
        testGroup: groupName,
        isConversions: false,
      });

      targetProperty = "visitorSize";
      break;

    case TRACK_TYPE.CONVERSION:
      if (!targetParticipant) {
        return TRACK_RESULT_MESSAGE.WRONG_TRACKING;
      }

      if (targetParticipant.isConversions) {
        return TRACK_RESULT_MESSAGE.PARTICIPATED_USER;
      }

      targetParticipant.isConversions = true;
      targetProperty = "conversionsSize";
      break;

    default:
      return TRACK_RESULT_MESSAGE.UNTRACKED_TYPE;
  }

  targetGroup[targetProperty] += value;
  await foundTest.save();

  return TRACK_RESULT_MESSAGE.SUCCESS_TRACKING;
};
