module.exports = (req, res) => {
  const { name = "Vercel function" } = req.query;
  res.send(`Hello ${name}!`);
};
