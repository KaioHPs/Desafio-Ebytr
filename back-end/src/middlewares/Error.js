module.exports = (err, _req, res, _next) => {
  let status;
  switch (err.code) {
    case 'invalid_data':
      status = 422;
      break;
    case 'not_found':
      status = 404;
      break;
    default:
      status = 500;
      break;
  }
  res.status(status).json(err);
};