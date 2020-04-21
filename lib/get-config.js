const findUp = require('find-up');
const path = require('path');
const Yam = require('yam');

// The project root directory is where the first package.json is found
// by walking up parent directories
async function findProjectRoot() {
  const packageJsonPath = await findUp('package.json');
  // just use the current dir if no parent package.json was found
  if (!packageJsonPath) {
    //console.log(`findProjectRoot: root dir not found - using cwd: ${process.cwd()}`);
    return process.cwd();
  }

  const rootDirectory = path.dirname(packageJsonPath);
  //console.log(`findProjectRoot: root dir is ${rootDirectory}`);
  return rootDirectory;
}


// Return the config from the .email-reporter config file in the project root (if it exists)
exports.getConfig = async function() {
  // find the project root
  const projectRoot = await findProjectRoot();
  // then look for the '.email-reporter' config file there
  const yam = new Yam('email-reporter', {
    primary: projectRoot,
  });

  return yam.getAll();
}
