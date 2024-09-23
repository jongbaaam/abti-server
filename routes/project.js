const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middleware/verifyToken");
const projectController = require("../controllers/projectController");

router.post(
  "/:userId/projects",
  isLoggedIn,
  projectController.registerProjectByUserId,
);

router.get(
  "/project/url-validation",
  isLoggedIn,
  projectController.validateProjectUrl,
);
module.exports = router;
