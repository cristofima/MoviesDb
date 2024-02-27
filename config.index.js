const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  console.log('API_KEY is missing');
  return
}

const PROXY_SERVER = process.env.PROXY_SERVER;
if (!PROXY_SERVER) {
  console.log('PROXY_SERVER is missing');
  return
}

const fs = require('node:fs');
const targetPath = "./src/environments/environment.prod.ts";

const envConfigFile = `export const environment = {
   production: true,
   apiKey: '${API_KEY}',
   proxyServer: '${PROXY_SERVER}'
};
`;

fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.log(err);
  }

  console.log(`Output generated at ${targetPath}`);
});
