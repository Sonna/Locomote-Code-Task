const http = require('http');
const Router = require('./lib/Router');

const router = new Router();

http.createServer(router).listen(3000);

console.log('Server running at http://127.0.0.1:3000/');
