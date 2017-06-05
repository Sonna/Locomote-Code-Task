const express = require('express');
const FlightAPI = require('./lib/services/FlightAPI');

const app = express();
const api = new FlightAPI();

app.use(express.static('public'));

// Lists all available airlines from the Flight API.
app.get('/airlines', function (req, res) {
  api.airlines(function (error, data) {
    res.status(200).json(data);
  });
})

// Lists all matching airports from the Flight API.
app.get('/airports', function (req, res) {
  let query = req.query.q;

  api.airports(query, function (error, data) {
    res.status(200).json(data);
  });
})

app.listen(3000);
