const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  changePassword,
  forgotPassword,
  resetPassword
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", authMiddleware, getProfile);

router.put("/change-password", authMiddleware, changePassword);
router.post("/forgot-password", forgotPassword);

router.put("/reset-password/:token", resetPassword);

module.exports = router;