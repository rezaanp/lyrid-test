const errorMiddleware = async (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }
  res
    .status(500)
    .json({
      error: err.message,
    })
    .end();
};

export default errorMiddleware;
