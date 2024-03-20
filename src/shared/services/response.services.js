const successfullResponse = (req, res) => {
  const { locals } = res;
  return res.status(200).json({ data: locals,status:'successfull',statusCode:200 });
}

module.exports = { successfullResponse}