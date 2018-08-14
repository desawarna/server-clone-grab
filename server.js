const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

const dataStore = require('nedb');

const db = new dataStore({ filename: '.data/toko.json', autoload: true });

app.get('/', (req, res) => {
  res.send('Database konek');
});

app.get('/api/restaurant', (req, res) => {
  db.find({}, (err, done) => {
    if (err) {
      res.send('error ambil data');
      return;
    }
    res.send(done);
  });
});

app.get('/api/restaurant/:name', (req, res) => {
  db.find({ name: req.params.name }, (err, done) => {
    if (err) {
      res.send('error ambil data');
      return;
    }
    res.send(done);
  });
});

app.post('/api/restaurant', (req, res) => {
  const data = {
    name: req.body.name,
    image: req.body.image,
    address: req.body.address,
    foods: []
  };
  db.insert(data, (err, done) => {
    if (err) {
      res.send('Error Post');
      return;
    }
    res.send(done);
  });
});

app.put('/api/restaurant/:id/foods', (req, res) => {
  console.log(req.body);
  const data = {
    name: req.body.name,
    price: req.body.price,
    image: req.body.image
  };
  db.update({ _id: req.params.id }, { $push: { foods: data } }, (err, done) => {
    if (err) {
      res.send('Error Post');
      return;
    }
    res.send('oke');
  });
});

app.put('/api/restaurant/:name', (req, res) => {
  const data = {
    name: req.body.name,
    image: req.body.image,
    address: req.body.address
  };
  db.update({ name: req.params.name }, data, {}, (err, done) => {
    if (err) {
      res.send('Error Put');
      return;
    }
    res.send('oke berhasil');
  });
});

app.delete('/api/restaurant/:id', (req, res) => {
  db.remove({ _id: req.params.id }, {}, (err, done) => {
    if (err) {
      res.send('Error delete');
      return;
    }
    res.send('oke berhasil delete');
  });
});

var listener = app.listen(8000, function() {
  console.log('server di ' + listener.address().port);
});
