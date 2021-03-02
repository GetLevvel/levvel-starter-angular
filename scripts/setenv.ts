const { writeFile, mkdir } = require('fs');
const { argv } = require('yargs');
// read environment variables from .env file
require('dotenv').config();
// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';
const envPath = './src/environments/';
const targetPath = `${envPath}environment.ts`;
const targetPath2 = `${envPath}environment.prod.ts`;
// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `export const environment = {
   production: ${isProduction},
   BROWSERSLIST_ENV: "${process.env.BROWSERSLIST_ENV}"
};
`;
// write the content to the respective file

mkdir(envPath, { recursive: true }, (err) => {
  if (err) {
    throw err;
  }
});

writeF(targetPath);
writeF(targetPath2);

function writeF(path) {
  writeFile(path, environmentFileContent, function (err) {
    if (err) {
      console.log(err);
    }
    console.log(`Wrote variables to ${path}`);
  });
}
