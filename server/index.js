const express = require('express');
const path = require('path');

const app = express();

const PORT = 3000;

app.use(express.static(path.join(__dirname, '../client/dist/')))

app.listen(PORT, console.log.bind(console, `now listening on port ${PORT}`));