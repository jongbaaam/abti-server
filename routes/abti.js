const express = require("express");
const router = express.Router();

const abtiController = require("../controllers/abtiController");
const testController = require("../controllers/testController");

router.get("/abti-client", abtiController.getAbtiClientCode);

router.get(
  "/users/configuration",
  abtiController.getUserConfigurationByAbtiUserId,
);

router.get("/tests/:testId", testController.getTestInformationByTestId);

router.patch(
  "/tests/:testId/specimen-statistics",
  testController.updateSpecimenStatisticsByTrackType,
);

module.exports = router;
