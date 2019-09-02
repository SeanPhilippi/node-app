const express = require('express');
const app = express();

app.use('/', (req, res, next) => {
  console.log('this always runs!');
  next();
});

app.use('/add-product', (req, res, next) => {
  console.log('In another middleware!');
  res.send(`<h1>The "Add Product" Page</h1>`);
});

app.use('/', (req, res, next) => {
  console.log('In another middleware!');
  // express send method sets header and allows writing with any data type
  res.send(`<h1>Hello from Express!</h1>`);
  next();
});

// const server = http.createServer(app);
// server.listen(3003, () => console.log('listening on 3003'));
// express shortcut for doing all of the above
app.listen(3003, () => console.log('listening on 3003 with express :)'));

