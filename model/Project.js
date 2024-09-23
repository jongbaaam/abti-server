const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
    trim: true,
    match: /^[A-Za-z0-9가-힣]+$/,
  },
  projectUrl: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  tests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "test",
    },
  ],
});

module.exports = mongoose.model("Project", projectSchema);
