const bodyParser = require('body-parser');
const app = require('https');
const fs = require('fs');
const db = require('./db');

const port = 3333;
const options = {
  key: fs.readFileSync('./162.208.11.43.key'),
  cert: fs.readFileSync('./162.208.11.43.cert')
};

app.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('started');
});

require('./controller')(app, db);
app.listen(port, () => {
  console.log('Listening on ' + port);
});

app.get("/status", (req, res) => {
  res.send("OK");
});
