const projectService = require("../services/projectService");
const ERROR_CASE = require("../constants/errorCase");

exports.registerProjectByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { projectName, projectUrl } = req.body;

    const registeredProject = await projectService.registerProjectByUserId({
      userId,
      projectUrl,
      projectName,
    });

    res.json({ registeredProject });
  } catch (error) {
    next(ERROR_CASE.SERVER_ERROR);
  }
};

exports.validateProjectUrl = async (req, res) => {
  try {
    const { projectUrl } = req.query;
    const { status } = await fetch(projectUrl, {
      method: "HEAD",
    });

    res.json({
      result: status === 200 ? true : false,
    });
  } catch (error) {
    res.json({
      result: false,
    });
  }
};
