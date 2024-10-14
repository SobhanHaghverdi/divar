function globalErrorHandler(error, req, res, next) {
  let status = error?.status ?? error?.statusCode ?? error?.code;

  if (!status || isNaN(+status) || status > 511 || status < 200) {
    status = 500;
  }

  return res.status(status).json({
    data: { body: req.body, query: req.query },
    message: error?.message ?? error?.stack ?? "Internal Server Error",
  });
}

export default globalErrorHandler;
