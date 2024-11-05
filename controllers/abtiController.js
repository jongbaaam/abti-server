const { v4: uuidv4 } = require("uuid");
const path = require("path");

const projectService = require("../services/projectService");

const ERROR_CASE = require("../constants/errorCase");
const {
  getDistributeGroup,
  getExpirationDate,
  validationUserId,
} = require("../utils/abtiUtil");
const { SERVER_DOMAIN } = require("./constants/config");

exports.getAbtiClientCode = async (req, res, next) => {
  const projectUrl = req.get("origin");

  const isValidationUrl =
    await projectService.validateProjectByProjectUrl(projectUrl);

  if (!isValidationUrl) {
    next(ERROR_CASE.INVALID_PROJECT);

    return;
  }

  res.sendFile("abtiClient.min.js", {
    root: path.join(__dirname, "../abti"),
  });
};

exports.getUserConfigurationByAbtiUserId = async (req, res, next) => {
  const { abtiUserId: targetUserId } = req.cookies;

  const isValidatedUserId = validationUserId(targetUserId);

  const validatedUserId =
    targetUserId && isValidatedUserId ? targetUserId : uuidv4();

  res.cookie("abtiUserId", validatedUserId, {
    domain: SERVER_DOMAIN,
    secure: true,
    httpOnly: true,
    sameSite: "none",
    expires: getExpirationDate(30),
  });

  res.json({
    distributedGroup: getDistributeGroup(validatedUserId),
  });
};
