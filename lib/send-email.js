const nodemailer = require("nodemailer");

exports.sendEmail = async function(subject, text, html, config, password) {

  // default is SMTP transport
  const transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.secure, // use TLS or not
    auth: {
      user: config.smtp.user,
      pass: password,
    },
    // NOTE: can enable these for debugging (or log them)
    //logger: true,
    //debug: true,
  });

  // send email with plain text and html body
  const info = await transporter.sendMail({
    from: config.from,
    to: config.to,
    subject,
    text,
    html,
  });

  // NOTE: can enable these for debugging (or log them)
  console.log("info object:")
  console.log(info)
}
