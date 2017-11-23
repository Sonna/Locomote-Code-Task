const ROOT_DIR = '../..';

const FlightAPI = require(ROOT_DIR + '/lib/services/FlightAPI');

const api = new FlightAPI();

function AirlineController() {};

// Lists all available airlines from the Flight API.
AirlineController.airlineList = function(request, response) {
  api.airlines(function (error, data) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(data), 'utf-8');
  });
}

module.exports = AirlineController;
