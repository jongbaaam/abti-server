const Test = require("../model/Test");

exports.getTestListByProjectId = async projectId => {
  const testListByProjectId = await Test.find({
    projectId,
  });

  return testListByProjectId;
};

exports.createTestByProjectId = async ({ projectId, testFormData }) => {
  const createdTest = await new Test({
    ...testFormData,
    projectId,
  }).save();

  return createdTest;
};
