const findUp = require('find-up');
const path = require('path');
const yam = require('yam');

// The project root directory is where the first package.json is found
// by walking up parent directories
exports.findProjectRoot = async function() {
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
