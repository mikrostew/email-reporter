const express = require('express')
const app = express()

exports.startServer = function(port) {
  // TODO: this should actually check things and add to the response, like
  // * config is setup?
  // * emails sent successfully?
  app.get('/status', (req, res) => res.send('running'))

  app.listen(port, 'localhost', () => console.log(`app listening at http://localhost:${port}`))

  // return a Promise that will never resolve
  return new Promise((_resolve, _reject) => {});
}
