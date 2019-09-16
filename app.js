const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

app.engine('hbs', expressHbs());
// pug is auto-installed by Express
// app.set('view engine', 'pug');
app.set('view engine', 'hbs');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

app.listen(3003, () => console.log('listening on 3003 with express :)'));

