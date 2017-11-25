const fs = require('fs');
const path = require('path');
const url = require('url');

FileServer.prototype.properties = {
  publicFolder: './public'
};

function FileServer(options) {
  this.properties = Object.assign({}, this.properties, options);
};

FileServer.prototype.handle = function (request, response) {
  const self = this;
  let filePath = self.properties.publicFolder + request.url;

  if (request.url == '/') {
    filePath = self.properties.publicFolder + '/index.html';
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
        fs.readFile(self.properties.publicFolder + '/404.html', function(error, content) {
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

module.exports = FileServer;
