// @desc   sends an email to UPE from the website
// @route  POST /api/v1/mailer/sendEmail
exports.sendEmail = async (req, res) => {
  try {
    const {name, email, message} = req.body;
    res.send({ success: true, message: `${name}'s email address is ${email}. They wish to say: ${message}`});
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};
