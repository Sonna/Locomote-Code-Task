const ROOT_DIR = '../..';

const url = require('url');
const FlightAPI = require(ROOT_DIR + '/lib/services/FlightAPI');

const api = new FlightAPI();

function AirportController() {};

// Lists all matching flights for given parameters from the Flight API.
AirportController.searchCreate = function(request, response) {
  const q = url.parse(request.url, true).query;
  // Strong parameters / filtered parameters
  const params = {
    date: q.date,
    from: q.from,
    to: q.to
  };

  api.search(params, function (error, data) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(data), 'utf-8');
  });
}

module.exports = AirportController;
