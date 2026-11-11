
const Job = require("../models/Job");
const ApiError = require("../utils/ApiError");
// CREATE JOB
const createJob = async (req, res) => {
  try {
    const { company, position, status, location } = req.body;

    // Input Validation
    if (!company || !company.trim()) {
      return res.status(400).json({
        success: false,
        message: "Company name is required"
      });
    }

    if (!position || !position.trim()) {
      return res.status(400).json({
        success: false,
        message: "Position is required"
      });
    }

    const job = await Job.create({
      company,
      position,
      status,
      location,
      user: req.user.userId
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
// GET ALL JOBS
const getAllJobs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 5,
      status,
      search,
      sort = "newest"
    } = req.query;

    const filter = {
      user: req.user.userId
    };

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { company: { $regex: search, $options: "i" } },
        { position: { $regex: search, $options: "i" } }
      ];
    }

    let sortOption = { createdAt: -1 };

    if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    }

    if (sort === "company") {
      sortOption = { company: 1 };
    }

    const pageNumber = Math.max(1, Number(page) || 1);
    const limitNumber = Math.min(100, Math.max(1, Number(limit) || 5));
    const skip = (pageNumber - 1) * limitNumber;

    const jobs = await Job.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNumber);

    const totalJobs = await Job.countDocuments(filter);

    res.status(200).json({
      success: true,
      totalJobs,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalJobs / limitNumber),
      jobs
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!job) {
      throw new ApiError(404, "Job not found");
    }

    return res.status(200).json({
      success: true,
      job
    });

  } catch (error) {
    next(error);
  }
};

// UPDATE JOB
const updateJob = async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.userId
      },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// DELETE JOB
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Job deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// EXPORT
module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob
};
