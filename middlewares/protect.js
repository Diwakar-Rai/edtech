const jwt = require("jsonwebtoken");
const CustomError = require("../utils/customError");
const { JWT_SECRET } = require("../config/index.config");
const userModel = require("../models/user.model");

const jwtVerify = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new CustomError("token missing", 401));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    let user = await userModel.findById(decoded.id).select("_id email role");
    if (!user) {
      return next(new CustomError("User not found", 404));
    }
    req.user = user;
    next();
  } catch (error) {
    //! Handled throw centralized error handler
    next(error);
  }
};

module.exports = { jwtVerify };
