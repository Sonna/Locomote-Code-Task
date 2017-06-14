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
  let url = this.airlinesURL();

  request.get(url, function (error, response, body) {
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
    // Ignore `invalid airline` on Bad Request and return an empty array
    if (typeof response === 'undefined' || response.statusCode == 400) {
      return callback(error, [])
    };

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

FlightAPI.prototype.search = function (params, callback) {
  let _this = this;
  let asyncAirlines = function (_this) {
    return new Promise(function (success, fail) {
      _this.airlines(function (error, data) {
        if (error) fail(error);
        success(data);
      });
    });
  };

  let airlineFlightSearch = function (airline) {
    return new Promise(function (success, fail) {
      _this.flightSearch(airline.code, params, function (error, data) {
        if (error) fail(error);
        success(data);
      });
    });
  };

  asyncAirlines(this)
    .then(function (airlinesData) {
      return Promise.all(airlinesData.map(airlineFlightSearch, _this));
    }).then(function (results) {
      // Flatten array of array results
      return results.reduce(function(a, b) { return a.concat(b); }, []);
    }).then(function (flatResults) {
      callback(null, flatResults);
    }).catch(function (error) {
      callback(error, []);
    });;
};

module.exports = FlightAPI;
