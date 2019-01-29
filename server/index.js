const express = require('express');
const path = require('path');
const app = express();

const PORT = 3000;

const pathToAssets = path.join(__dirname, '../client/dist');
const staticAssetsMiddleware = express.static(pathToAssets);

app.use(staticAssetsMiddleware);

app.get('/groceries', (req, res) => {
  console.log('serving all the groceries');
  res.status(200).send('all the groceries');
});

app.post('/groceries', (req, res) => {
  console.log('saving a grocery');
  res.sendStatus(201);
});







app.listen(PORT, () => {
  console.log(`NOW LISTENING ON PORT ${PORT}`);
});