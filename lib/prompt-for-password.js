// adapted from https://stackoverflow.com/a/33500118

const readline = require('readline');
const { Writable } = require('stream');


exports.promptForPassword = function(user) {
  // write to process.stdout unless this is set to silent
  // (I would name this 'mutableStdout', but mutable reminds me of mutability in Rust)
  const restrictedStdout = new Writable({
    write: function(chunk, encoding, callback) {
      if (!this.silent) {
        process.stdout.write(chunk, encoding);
      }
      callback();
    }
  });

  // initially this needs to print the question prompt
  restrictedStdout.silent = false;

  // interface for reading the user input
  const rl = readline.createInterface({
    input: process.stdin,
    output: restrictedStdout,
    terminal: true
  });

  return new Promise((resolve, _reject) => {
    rl.question(`Password for ${user}: `, function(password) {
      // echo the enter
      process.stdout.write('\n');

      // close the interface or this will hang
      rl.close();

      resolve(password);
    });

    // dont print whatever the user types
    restrictedStdout.silent = true;
  });
}
