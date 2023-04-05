// @packages
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
// @scripts
const {
  UPE_EMAIL_ADDRESS,
  EMAIL,
  MAILING_ID,
  MAILING_REFRESH,
  MAILING_SECRET,
} = process.env;
const oauth_link = 'https://developers.google.com/oauthplayground';

const auth = new OAuth2(
  MAILING_ID,
  MAILING_SECRET,
  MAILING_REFRESH,
  oauth_link
);


exports.sendContactEmail = (name, email, message) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });
  const accessToken = auth.getAccessToken();

  const smtp = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });

  const mailOptions = {
    from: EMAIL,
    to: UPE_EMAIL_ADDRESS,
    subject: 'UPE Contact Request',
    html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#151922"><span>Attention: UPE Contact Request</span></div><div style="padding:1rem 0;border-top:1px solid #e6e6e6;border-bottom:1px solid #e6e6e6;color:#141823;font-size:17px;font-family:Roboto"><span>New Message from: ${name}</span><div style="padding:10px 0"><span style="padding:1.5rem 0">Email: ${email}</span></div><br><div style="padding-top:5px"><span style="margin:1.5rem 0;color:#000">"${message}"<br><br>~ ${name}</span></div></div>`,
  };
  
  smtp.sendMail(mailOptions, (err, res) => {
    if (err) { return err; }
    return res;
  });
};
