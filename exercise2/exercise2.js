const express = require('express');
const app = express();

// put more specfiic middleware at the top
app.use('/users', (req, res, next) => {
  // console.log('in 2nd middleware, res is returned here');
  res.send(`<p>message from response in /users</p>`)
});

app.use('/', (req, res, next) => {
  // console.log('in 1st middleware, res always hits this');
  res.send(`<p>message from response in /</p>`)
  // next();
});

app.listen(3004, () => console.log('listening on 3004, exercise 2'));