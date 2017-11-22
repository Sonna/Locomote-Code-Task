const ROOT_DIR = '../..';

const url = require('url');
const FlightAPI = require(ROOT_DIR + '/lib/services/FlightAPI');

const api = new FlightAPI();

function AirportController() {};

// Lists all matching airports from the Flight API.
AirportController.airportList = function(request, response) {
  const q = url.parse(request.url, true).query.q;

  api.airports(q, function (error, data) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(data), 'utf-8');
  });
}

module.exports = AirportController;
