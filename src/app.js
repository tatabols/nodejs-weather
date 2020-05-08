const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./forecast');

const app = express();

const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get('', (req, res) => {
  res.render('index', { title: 'Weather', name: 'Charles Borabien' });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Charles Borabien',
  });
});

app.get('/help', (req, res) => {
  res.render('help', { title: 'Help', name: 'Charles Borabien' });
});

app.get('/weather', (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({ error: 'You must provide a search term.' });
  }

  forecast(address, (err, { temp, temp_min, temp_max } = {}) => {
    if (err) {
      return res.send({ error: err });
    }

    res.send({ address, temp, temp_min, temp_max });
  });
});

app.get('/help/*', (req, res) => {
  res.render('help404', {
    title: '404',
    errorMessage: 'Help Not Found',
    name: 'Charles Borabien',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page Not Found',
    name: 'Charles Borabien',
  });
});

app.listen(3000, () => {
  console.log('server is up on port 3000');
});
