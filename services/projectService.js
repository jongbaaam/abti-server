const Project = require("../model/Project");

exports.registerProjectByUserId = async ({
  userId,
  projectName,
  projectUrl,
}) => {
  const registeredProject = await new Project({
    projectName,
    projectUrl,
    user: userId,
  }).save();

  return registeredProject;
};

exports.getProjectListByUserId = async userId => {
  const projectListByUserId = await Project.find({
    user: userId,
  });

  return projectListByUserId;
};
