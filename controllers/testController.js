const testService = require("../services/testService");
const projectService = require("../services/projectService");

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
    next(ERROR_CASE.SERVER_ERROR);
  }
};

exports.getTestByTestId = async (req, res, next) => {
  const { testId } = req.params;

  try {
    const foundTestById = await testService.findTestByTestId(testId);

    res.json(foundTestById);
  } catch (error) {
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

exports.updateSpecimenStatisticsByGroupName = async (req, res, next) => {
  const { testId } = req.params;
  const { groupName, action } = req.body;
  console.log(action);
  const { type, targetProperty, value } = action;
  try {
    if (type === PATCH_ACTION_TYPE.INCREASE) {
      await testService.increaseSpecimenStatisticsByGroupName({
        testId,
        groupName,
        targetProperty,
        value,
      });

      res.status(200).json({
        success: true,
      });
    }
  } catch (error) {
    next(ERROR_CASE.SERVER_ERROR);
  }
};

exports.getTestInformationByTestId = async (req, res, next) => {
  const { testId } = req.params;

  try {
    const { pagePath, targetElementId, _id, projectId } =
      await testService.findTestByTestId(testId);

    const { projectUrl } =
      await projectService.getProjectByProjectId(projectId);

    const testInformation = {
      targetElementId,
      pagePath,
      pageOrigin: projectUrl,
      testId: _id,
    };

    res.json(testInformation);
  } catch (error) {
    next(ERROR_CASE.SERVER_ERROR);
  }
};
