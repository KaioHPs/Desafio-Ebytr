module.exports = (err, _req, res) => {
  res.status(404).json({ err });
};