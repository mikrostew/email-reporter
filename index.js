const { getConfig } = require('./lib/get-config');
const { parseArgs } = require('./lib/cli');
const { promptForPassword } = require('./lib/prompt-for-password');
const { runServer } = require('./lib/rest-server');


// read config, prompt for password, then start the server
async function main() {
  const args = await parseArgs();
  // TODO: override things from config
  const config = await getConfig();
  // TODO: validate that config
  // NOTE: can enable this for debugging (or log it)
  console.log(config);
  const password = await promptForPassword(config.smtp.user);

  return runServer(args.flags.port, config, password)
}

main().catch(console.error);
