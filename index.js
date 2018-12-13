const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const db = require('./db');

const port = 3333;
const options = {
  key: fs.readFileSync('./162.208.11.43.key'),
  cert: fs.readFileSync('./162.208.11.43.cert')
};

const app = express();
https.createServer(options, app).listen(port);

require('./controller')(app, db);

app.get("/status", (req, res) => {
  res.send("OK");
});
