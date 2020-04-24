const nodemailer = require("nodemailer");

// track stats
let numberOfEmailsSent = 0;
let emailHadError = false;

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

  // TODO: catch errors and report those in the status
}

// email stats and status
exports.emailStatus = function(req, res, next) {
  // TODO: this seems too wordy...
  res.locals.status.numberOfEmailsSent = numberOfEmailsSent;
  // assume this is running unless there was an error
  res.locals.status.states.push(emailHadError ? 'error' : 'running');
  next();
}
