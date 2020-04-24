const { configStatus } = require('./get-config');
const { emailStatus } = require('./send-email');
const express = require('express')
const { passwordStatus } = require('./prompt-for-password');
const { processStats } = require('./service-stats');
const { sendEmail } = require('./send-email');

const app = express()

// parse the received JSON
// (assuming the sender is using "ContentType: application/json")
app.use(express.json())

// middleware that will be executed before the /status response
// TODO: combine the states into a single state
const generateStatus = [initStatus, configStatus, passwordStatus, emailStatus, serverStatus, processStats];

// initialize this object so other middleware can add to it
function initStatus(req, res, next) {
  res.locals.status = {};
  // array of states that will be combined into 'state' at the end
  // (can be 'loading', 'running', or 'error')
  res.locals.status.states = [];
  next();
}

function serverStatus(req, res, next) {
  // if this is getting called, then the server is running
  res.locals.status.serverIsRunning = true;
  res.locals.status.states.push('running');
  next();
}

exports.runServer = function(port, config, password) {
  // respond with JSON describing the service status
  // TODO: it looks like:
  // {
  // }
  // TODO: add config to this response
  app.get('/status', generateStatus, (req, res) => res.json(res.locals.status));

  // handle POST request to send an email
  app.post('/email-report', async function (req, res) {
    const body = req.body;
    // TODO: check each of these fields before sending
    console.log(body.subject);
    console.log(body.text);
    console.log(body.html);
    // actually send the mail here:
    await sendEmail(body.subject, body.text, body.html, config, password);
    // TODO: return the status from that ^^, and any error
    res.json({ status: "ok" });
  });

  app.listen(port, 'localhost', () => console.log(`app listening at http://localhost:${port}`))

  // return a Promise that will never resolve
  // (have to kill this or Ctrl-C)
  return new Promise((_resolve, _reject) => {});
}
