const ROOT_DIR = '..';

const url = require('url');
const FileServer = require(ROOT_DIR + '/lib/services/FileServer');
const routes = require(ROOT_DIR + '/config/routes');

const fileServer = new FileServer();

function Router() {
  return this.handle;
};

Router.prototype.handle = function (request, response) {
  const req = url.parse(request.url, true);
  const service = routes[req.pathname];

  if(service != null) {
    service(request, response);
  } else {
    fileServer.handle(request, response);
  }
}

module.exports = Router;
