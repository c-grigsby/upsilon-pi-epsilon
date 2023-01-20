// @packages
const express = require('express');
// @scripts
const { sendEmail } = require('../controllers/mailer-controller');

const router = express.Router();

router.post('/api/v1/mailer/sendEmail', sendEmail);

module.exports = router;