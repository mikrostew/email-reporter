const { configStatus } = require('./get-config');
const { emailStatus } = require('./send-email');
const express = require('express')
const { passwordStatus } = require('./prompt-for-password');
const { processStats } = require('./service-stats');

const app = express()

// parse the received JSON
// (assuming the sender is using "ContentType: application/json")
app.use(express.json())

// middleware that will be executed before the /status response
const generateStatus = [initStatus, configStatus, passwordStatus, emailStatus, serverStatus, processStats];

// respond with JSON describing the service status
// TODO: it looks like:
// {
// }
app.get('/status', generateStatus, (req, res) => res.json(res.locals.status));

// handle POST request to send an email
app.post('/email-report', function (req, res) {
  const body = req.body;
  // TODO: check each of these fields before sending
  console.log(body.subject);
  console.log(body.text);
  console.log(body.html);
  // TODO: actually send the mail here
  // (for now just echo the input)
  res.json(body);
});

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

exports.runServer = function(port) {
  app.listen(port, 'localhost', () => console.log(`app listening at http://localhost:${port}`))

  // return a Promise that will never resolve
  // (have to kill this or Ctrl-C)
  return new Promise((_resolve, _reject) => {});
}
