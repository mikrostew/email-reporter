const meow = require('meow');

const DEFAULT_PORT = 3000;

const USAGE = `
  Usage
    $ email-reporter [options]

  Options
    --port, -p  Port number for the server (default ${DEFAULT_PORT})

  Examples
    $ email-reporter --port 3456
    Password for user.name@email.com:
    app listening at http://localhost:3456
`;

exports.parseArgs = function() {
  return new Promise((resolve) => {
    // TODO: add options for all the things in the config file?
    const cli = meow(USAGE, {
      flags: {
        port: {
          type: 'number',
          alias: 'p',
          default: DEFAULT_PORT,
        }
      }
    });

    resolve(cli);
  });
};
