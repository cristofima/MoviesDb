const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  console.log('API_KEY is missing');
  return
}

const fs = require('node:fs');
const targetPath = "./src/environments/environment.ts";

const envConfigFile = `export const environment = {
   production: false,
   apiKey: '${API_KEY}'
};
`;

fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.log(err);
  }

  console.log(`Output generated at ${targetPath}`);
});
