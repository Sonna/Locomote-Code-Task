const express = require('express');
const app = express();

app.use(express.static('public'));

// Lists all available airlines from the Flight API.
app.get('/airlines', function (req, res) {
  var airlines = [];
  res.status(200).send(airlines);
})

app.listen(3000);
