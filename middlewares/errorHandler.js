const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const message = err.message || "Internal Server Error";
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({ success: false, error: message });
};

module.exports = errorHandler;
