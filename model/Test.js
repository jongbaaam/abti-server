const mongoose = require("mongoose");

const specimenStatisticsSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: true,
    trim: true,
    enum: {
      values: ["A", "B"],
    },
  },
  visitorSize: {
    type: Number,
    default: 0,
  },
  conversionsSize: {
    type: Number,
    default: 0,
  },
});

const testSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  progressStatus: {
    type: String,
    required: true,
    trim: true,
    default: "PENDING",
    enum: {
      values: ["PENDING", "IN_PROGRESS", "PAUSED"],
    },
  },
  createdAt: {
    type: Date,
    required: true,
    default: () => {
      return new Date().toISOString();
    },
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
  },
  specimenStatistics: [specimenStatisticsSchema],
});

module.exports = mongoose.model("Test", testSchema);
