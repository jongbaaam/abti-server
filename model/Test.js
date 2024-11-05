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

const testParticipantsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    trim: true,
  },
  testGroup: {
    type: String,
    required: true,
    trim: true,
  },
  isConversions: {
    type: Boolean,
    required: true,
    default: false,
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
  targetElementId: {
    type: String,
    required: true,
    trim: true,
  },
  pagePath: {
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
  testParticipants: {
    type: [testParticipantsSchema],
  },
  specimenStatistics: {
    type: [specimenStatisticsSchema],
    default: [
      {
        groupName: "A",
        visitorSize: 0,
        conversionsSize: 0,
      },
      {
        groupName: "B",
        visitorSize: 0,
        conversionsSize: 0,
      },
    ],
  },
});

module.exports = mongoose.model("Test", testSchema);
