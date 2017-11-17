const http = require('http');
const url = require('url');
const FlightAPI = require('./lib/services/FlightAPI');
const FileServer = require('./lib/services/FileServer');

const api = new FlightAPI();
const fileServer = new FileServer();

// Airlines Controller
// Lists all available airlines from the Flight API.
function airlineList(request, response) {
  api.airlines(function (error, data) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(data), 'utf-8');
  });
}

// Airports Controller
// Lists all matching airports from the Flight API.
function airportsList(request, response) {
  const q = url.parse(request.url, true).query.q;

  api.airports(q, function (error, data) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(data), 'utf-8');
  });
}

// Search Controller
// Lists all matching airports from the Flight API.
function searchCreate(request, response) {
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

const routes = {
  '/airlines': airlineList,
  '/airports': airportsList,
  '/search': searchCreate
}

function router(request, response) {
  const req = url.parse(request.url, true);
  const service = routes[req.pathname];

  if(service != null) {
    service(request, response);
  } else {
    fileServer.handle(request, response);
  }
}

http.createServer(router).listen(3000);

console.log('Server running at http://127.0.0.1:3000/');
