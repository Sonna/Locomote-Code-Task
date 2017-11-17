const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const FlightAPI = require('./lib/services/FlightAPI');

const api = new FlightAPI();

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

function serveFile(request, response) {
  const publicFolder = './public';
  let filePath = publicFolder + request.url;

  if (request.url == '/') {
    filePath = publicFolder + '/index.html';
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  let contentType = 'text/html';
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    // '.png': 'image/png',
    // '.jpg': 'image/jpg',
    // '.gif': 'image/gif',
    // '.wav': 'audio/wav',
    // '.mp4': 'video/mp4',
    // '.woff': 'application/font-woff',
    // '.ttf': 'application/font-ttf',
    // '.eot': 'application/vnd.ms-fontobject',
    // '.otf': 'application/font-otf',
    // '.svg': 'application/image/svg+xml'
  };

  contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, function(error, content) {
    if (error) {
      if(error.code == 'ENOENT'){
        fs.readFile(publicFolder + '/404.html', function(error, content) {
          response.writeHead(200, { 'Content-Type': contentType });
          response.end(content, 'utf-8');
        });
      }
      else {
        response.writeHead(500);
        response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
        response.end();
      }
    }
    else {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content, 'utf-8');
    }
  });
}

function router(request, response) {
  const req = url.parse(request.url, true);
  const service = routes[req.pathname];

  if(service != null) {
    service(request, response);
  } else {
    serveFile(request, response);
  }
}

http.createServer(router).listen(3000);

console.log('Server running at http://127.0.0.1:3000/');
