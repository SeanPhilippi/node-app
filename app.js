const path = require('path');
const express = require('express');
const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/admin', adminRoutes);
app.use('/shop', shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3003, () => console.log('listening on 3003 with express :)'));

