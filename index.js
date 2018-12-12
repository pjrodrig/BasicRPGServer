const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();

const port = 3333;

app.use(bodyParser.json());

require('./controller')(app, db);
app.listen(port, () => {
  console.log('Listening on ' + port);
});

app.get("/status", (req, res) => {
  res.send("OK");
});
