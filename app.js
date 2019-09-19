const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// 'view engine' is a reserved express key, you set it to a templating or view engine. ejs and pug come
// with express and don't need to be imported, unlike express-handlebars
app.set('view engine', 'ejs');
// tell express where your views are located.  'views' is a reserved key in express, if you
// name your views folder 'views', this line isn't really necessary as that is the default
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
  res.status(404).render('404', { pageTitle: 'Page Not Found', path: '' });
});

app.listen(3003, () => console.log('listening on 3003 with express :)'));

