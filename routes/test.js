const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middleware/verifyToken");
const testController = require("../controllers/testController");

router.get(
  "/:userId/projects/:projectId/tests",
  isLoggedIn,
  testController.getTestListByProjectId,
);

router.get(
  "/:userId/projects/:projectId/tests/:testId",
  isLoggedIn,
  testController.getTestByTestId,
);

router.delete(
  "/:userId/projects/:projectId/tests/:testId",
  isLoggedIn,
  testController.deleteTestByTestId,
);

router.post(
  "/:userId/projects/:projectId/tests",
  isLoggedIn,
  testController.createTestByProjectId,
);

module.exports = router;
