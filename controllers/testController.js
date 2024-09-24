const testService = require("../services/testService");
const ERROR_CASE = require("../constants/errorCase");

exports.getTestListByProjectId = async (req, res, next) => {
  const { projectId } = req.params;

  try {
    const testListByProjectId =
      await testService.getTestListByProjectId(projectId);

    res.json({
      testListByProjectId,
    });
  } catch (error) {
    console.error(error);
    next(ERROR_CASE.SERVER_ERROR);
  }
};

exports.createTestByProjectId = async (req, res, next) => {
  const { projectId } = req.params;
  const { testFormData } = req.body;

  try {
    const createdTest = await testService.createTestByProjectId({
      projectId,
      testFormData,
    });

    res.status(201).json(createdTest);
  } catch (error) {
    console.log(error);
    next(ERROR_CASE.SERVER_ERROR);
  }
};