const querystring = require('querystring');
const request = require('request');
const url = require('url');

FlightAPI.prototype.properties = {
  baseURL: 'http://node.locomote.com/code-task/',
  airlinesPath: 'airlines',
  airportsPath: 'airports',
  flightSearchPath: 'flight_search'
};

function FlightAPI(options) {
  this.properties = Object.assign({}, this.properties, options);
};

FlightAPI.prototype.airlines = function (callback) {
  request.get(this.airlinesURL(), function (error, response, body) {
    let parsed = JSON.parse(body);
    callback(error, parsed);
  });
};

FlightAPI.prototype.airlinesURL = function () {
  return url.resolve(this.properties.baseURL, this.properties.airlinesPath);
}

FlightAPI.prototype.airports = function (query, callback) {
  let q = ((typeof query === 'undefined') ? '' : query);

  request.get(this.airportsURL(q), function (error, response, body) {
    let parsed = JSON.parse(body);
    callback(error, parsed);
  });
};

FlightAPI.prototype.airportsURL = function (query) {
  return url.resolve(
    this.properties.baseURL,
    this.properties.airportsPath + '?q=' + encodeURIComponent(query)
  );
}

// Provides a list of available flights for a single airline.
//
//     http://node.locomote.com/code-task/flight_search/QF?date=2018-09-02&from=SYD&to=JFK
FlightAPI.prototype.flightSearch = function (airlineCode, options, callback) {
  let params = ((typeof options === 'undefined') ? {} : options);
  let url = this.flightSearchURL(airlineCode, params);

  // request.get(this.flightSearchURL(airlineCode, params), function (error, response, body) {
  request.get(url, function (error, response, body) {
    let parsed = JSON.parse(body);
    callback(error, parsed);
  });
};

FlightAPI.prototype.flightSearchURL = function (airlineCode, options) {
  let params = querystring.stringify(options);

  return url.resolve(
    this.properties.baseURL,
    this.properties.flightSearchPath +
      '/' + encodeURIComponent(airlineCode) + '?' + params
  );
}

module.exports = FlightAPI;
