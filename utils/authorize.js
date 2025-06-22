const CustomError = require("./customError");

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return next(
        new CustomError(
          `User role ${req?.user?.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};

module.exports = authorize;
