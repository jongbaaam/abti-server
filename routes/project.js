const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middleware/verifyToken");
const projectController = require("../controllers/projectController");

router.get(
  "/:userId/projects",
  isLoggedIn,
  projectController.getProjectListByUserId,
);

router.post(
  "/:userId/projects",
  isLoggedIn,
  projectController.registerProjectByUserId,
);

router.delete(
  "/:userId/projects/:projectId",
  isLoggedIn,
  projectController.deleteProjectByUserId,
);

router.get(
  "/project/url-validation",
  isLoggedIn,
  projectController.validateProjectUrl,
);

module.exports = router;
