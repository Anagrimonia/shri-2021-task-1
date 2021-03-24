express = require('express');
path = require('path');

const app = express();
const {
  PORT = 8080,
} = process.env;

app.use(express.static(path.join(__dirname, "build")));

app.get('/', (req, res) => {
  res.sendfile(__dirname + "build/index.html");
});

app.listen(PORT, () => {
  console.log('Server started at http://localhost:' + PORT);
});