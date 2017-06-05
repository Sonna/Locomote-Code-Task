const request = require('request');

function FlightAPI() {};

FlightAPI.prototype.airlines = function (callback) {
  request.get('http://node.locomote.com/code-task/airlines', function(error, response, body) {
    let parsed = JSON.parse(body);
    callback(response.statusCode, parsed);
  });
};

module.exports = FlightAPI;
