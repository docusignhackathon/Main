const express = require('express');
const path = require('path');
const app = express();

const SigningCeremony = require('./SigningCeremony');

const PORT = 3000;

const pathToAssets = path.join(__dirname, '../client/dist');
const staticAssetsMiddleware = express.static(pathToAssets);

app.use(staticAssetsMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/docusign', (req, res) => {
  console.log(req.body);
  return SigningCeremony(req.body, res);
});

app.listen(PORT, () => {
  console.log(`NOW LISTENING ON PORT ${PORT}`);
});
