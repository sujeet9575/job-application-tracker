
const adminMiddleware = (req, res, next) => {

  // Check user authentication
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required"
    });
  }

  // Check admin role
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin only."
    });
  }

  // Allow admin
  next();
};

module.exports = adminMiddleware;
