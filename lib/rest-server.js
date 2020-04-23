const express = require('express')

const app = express()

// parse the received JSON
// (assuming the sender is using "ContentType: application/json")
app.use(express.json())

// TODO: before the app.get(), do some app.use() middlewares,
// imported from other files,
// that can add things like:
// * config is setup?
// * password is entered?
// * emails sent successfully?
// * number of emails sent
// * uptime
// * memory usage
// (using res.locals: http://expressjs.com/en/api.html#res.locals)

// TODO: this should be a JSON response
app.get('/status', (req, res) => res.send('running'))

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


exports.runServer = function(port) {
  app.listen(port, 'localhost', () => console.log(`app listening at http://localhost:${port}`))

  // return a Promise that will never resolve
  return new Promise((_resolve, _reject) => {});
}
