const express = require('express');
const path = require('path');
const app = express();

const SigningCeremony = require('./SigningCeremony');

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

app.post('/docusign', SigningCeremony);
app.get('/docusign', (req, res) => {
  res.send(`<html lang="en"><body><form action="${req.url}" method="post">
   <input type="submit" value="Sign the document!"
    style="width:13em;height:2em;background:#1f32bb;color:white;font:bold 1.5em arial;margin: 3em;"/>
   </form></body>`)
});
app.get('/dsreturn', (req, res) => {
  res.send(`<html lang="en"><body><p>The signing ceremony was completed with
    status ${req.query.event}</p><p>This page can also implement post-signing processing.</p></body>`)
});

app.listen(PORT, () => {
  console.log(`NOW LISTENING ON PORT ${PORT}`);
});
