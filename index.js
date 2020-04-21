const { getConfig } = require('./lib/get-config');
const { promptForPassword } = require('./lib/prompt-for-password');
const { sendEmail } = require('./lib/send-email');

// for testing while I develop this
async function main() {
  const config = await getConfig();
  // TODO: validate that config
  // NOTE: can enable this for debugging (or log it)
  console.log(config);
  const password = await promptForPassword(config.smtp.user);

  const subject = "Hello #2 ✔";
  const text = "Second email";
  const html = "This is the <b>2nd</b> email I've sent from this script.";
  await sendEmail(subject, text, html, config, password);
}


main().catch(console.error);
