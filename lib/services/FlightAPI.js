const request = require('request');
const url = require('url');

FlightAPI.prototype.properties = {
  baseURL: 'http://node.locomote.com/code-task/',
  airlinesPath: 'airlines'
};

function FlightAPI(options) {
  this.properties = Object.assign({}, this.properties, options);
};

FlightAPI.prototype.airlines = function (callback) {
  request.get(this.airlinesURL(), function (error, response, body) {
    let parsed = JSON.parse(body);
    callback(response.statusCode, parsed);
  });
};

FlightAPI.prototype.airlinesURL = function () {
  return url.resolve(this.properties.baseURL, this.properties.airlinesPath);
}

module.exports = FlightAPI;
