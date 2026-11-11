const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    trim: true
  },

  position: {
    type: String,
    required: true,
    trim: true
  },

  status: {
    type: String,
    enum: ["Applied", "Interview", "Selected", "Rejected"],
    default: "Applied"
  },

  location: {
    type: String,
    default: ""
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

}, { timestamps: true });

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;