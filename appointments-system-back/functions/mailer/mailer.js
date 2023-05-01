const nodemailer = require("nodemailer");

exports.sendEmail = async (mailText, eventTitle, users) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: users,
    subject: "reminder message",
    html: `<h2>${eventTitle}</h2>
            <h2>${mailText}</h2>`,
  };

  return transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      return false;
    }
    return true;
  });
};

