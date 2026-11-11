
const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");

const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob
} = require("../controllers/jobController");

const authMiddleware = require("../middleware/authMiddleware");

// Validation middleware
const validateJob = [
  body("company")
    .trim()
    .notEmpty()
    .withMessage("Company name is required"),

  body("position")
    .trim()
    .notEmpty()
    .withMessage("Position is required"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    next();
  }
];

// Job Routes
router.post("/", authMiddleware, validateJob, createJob);
router.get("/", authMiddleware, getAllJobs);
router.get("/:id", authMiddleware, getJobById);
router.put("/:id", authMiddleware, updateJob);
router.delete("/:id", authMiddleware, deleteJob);

module.exports = router;
