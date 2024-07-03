const successRes = (
  res,
  { statusCode = 200, message = "successful", payload = {} }
) => {
  return res.status(statusCode).json({
    statusCode,
    success: true,
    message,
    payload,
  });
};

const errorRes = (res, { statusCode = 500, message = "failed" }) => {
  return res.status(statusCode).json({
    statusCode,
    success: false,
    message,
  });
};

module.exports = {
  successRes,
  errorRes,
};
