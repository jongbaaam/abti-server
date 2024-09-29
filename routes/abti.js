const express = require("express");
const path = require("path");
const router = express.Router();

const projectService = require("../services/projectService");
const testController = require("../controllers/testController");

router.get("/abtiClient", async (req, res) => {
  const projectUrl = req.get("origin");

  const isValidationUrl =
    await projectService.validateProjectByProjectUrl(projectUrl);

  if (isValidationUrl) {
    res.sendFile("abtiClient.js", {
      root: path.join(__dirname, "../abti"),
    });
  }
});

router.patch(
  "/tests/:testId/specimenStatistics",
  testController.updateSpecimenStatisticsByGroupName,
);

module.exports = router;
