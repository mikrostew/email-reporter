const { promptForPassword } = require('./lib/prompt-for-password');

promptForPassword().then(password => {
  console.log('Password is: ' + password);
});
