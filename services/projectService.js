const Project = require("../model/Project");
const Test = require("../model/Test");

exports.registerProjectByUserId = async ({
  userId,
  projectName,
  projectUrl,
}) => {
  const removedLastCharSlashUrl =
    projectUrl.slice(-1) === "/" ? projectUrl.slice(0, -1) : projectUrl;

  const registeredProject = await new Project({
    projectName,
    projectUrl: removedLastCharSlashUrl,
    user: userId,
  }).save();

  return registeredProject;
};

exports.deleteProjectByProjectId = async projectId => {
  await Project.findByIdAndDelete(projectId);

  await Test.deleteMany({
    projectId,
  });
};

exports.getProjectListByUserId = async userId => {
  const projectListByUserId = await Project.find({
    user: userId,
  });

  return projectListByUserId;
};

exports.getProjectByProjectId = async projectId => {
  const projectByProjectId = await Project.findById(projectId);

  return projectByProjectId;
};

exports.validateProjectByProjectUrl = async projectUrl => {
  const foundProject = await Project.find({
    projectUrl,
  });

  return Boolean(foundProject);
};
