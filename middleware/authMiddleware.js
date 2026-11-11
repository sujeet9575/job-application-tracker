
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // 1. Authorization header check karo
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Token required."
      });
    }

    // 2. Header se token nikalo
    const token = authHeader.split(" ")[1];

    // 3. JWT token verify karo
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // 4. UserId check karo
    if (!decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload"
      });
    }

    // 5. User ki information request mein save karo
    req.user = decoded;

    // 6. Next middleware/controller par jao
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};

module.exports = authMiddleware;
