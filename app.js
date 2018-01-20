const app = require('./server');

const port = process.env.port || 3000

app.listen(port, function () {
  console.log(`The server is listening on port ${port}`)
});
