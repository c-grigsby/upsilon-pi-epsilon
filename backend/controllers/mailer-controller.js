// @scripts
const { sendContactEmail } = require('../helpers/mail');

// @desc   sends an email to UPE from the website
// @route  POST /api/v1/mailer/sendEmail
exports.sendEmail = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    sendContactEmail(name, email, message);
    res.send({
      success: true,
      message: 'An email has been sent to UPE',
      data: { name: name, email: email, msg: message },
    });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};
