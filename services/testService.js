const Test = require("../model/Test");

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

exports.increaseSpecimenStatisticsByGroupName = async ({
  testId,
  groupName,
  targetProperty,
  value,
}) => {
  const foundTest = await Test.findById(testId);

  const targetGroup = foundTest.specimenStatistics.find(element => {
    return element.groupName === groupName;
  });

  targetGroup[targetProperty] += value;

  await foundTest.save();
};
