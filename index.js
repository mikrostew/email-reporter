const { getConfig } = require('./lib/get-config');
const { promptForPassword } = require('./lib/prompt-for-password');
const { runServer } = require('./lib/rest-server');

// TODO: accept command line argument for this
const PORT = 3000

// read config, prompt for password, then start the server
async function main() {
  const config = await getConfig();
  // TODO: validate that config
  // NOTE: can enable this for debugging (or log it)
  console.log(config);
  const password = await promptForPassword(config.smtp.user);

  return runServer(PORT, config, password)
}

main().catch(console.error);
