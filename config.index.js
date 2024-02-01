const fs = require('node:fs');
const targetPath = "./src/environments/environment.prod.ts";
const envConfigFile = `export const environment = {
   production: true,
   apiKey: '${process.env.API_KEY}'
};
`;

fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.log(err);
  }

  console.log(`Output generated at ${targetPath}`);
});
