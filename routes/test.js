const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middleware/verifyToken");
const testController = require("../controllers/testController");

router.get(
  "/:userId/projects/:projectId",
  isLoggedIn,
  testController.getTestListByProjectId,
);

router.post(
  "/:userId/projects/:projectId/tests",
  isLoggedIn,
  testController.createTestByProjectId,
);

module.exports = router;
