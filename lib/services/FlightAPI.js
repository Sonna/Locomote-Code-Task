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

// Get a list of Airlines asynchronously
//
// @returns {Promise.<object[]>} Array of airlines
FlightAPI.prototype.asyncAirlines = function () {
  const self = this;

  return new Promise(function (success, fail) {
    self.airlines(function (error, data) {
      if (error) fail(error);
      success(data);
    });
  });
};

FlightAPI.prototype.airlinesURL = function () {
  return url.resolve(this.properties.baseURL, this.properties.airlinesPath);
}

// Provides an airport search.
//
//     http://node.locomote.com/code-task/airports?q=Melbourne
//
// > Provides an airport search.
// >
// > Query parameters:
// > - `q` - text based search param
// >
// > The `airportCode` from the response is required for the flight search.
//
// @param {String} query - `from` or `to` location of required airports
FlightAPI.prototype.airports = function (query, callback) {
  let q = ((typeof query === 'undefined') ? '' : query);

  request.get(this.airportsURL(q), function (error, response, body) {
    let parsed = JSON.parse(body);
    callback(error, parsed);
  });
};

// Get a list of Airports for a given query asynchronously
//
// @param {String} query - `from` or `to` location of required airports
// @returns {Promise.<object[]>} Array of Airports
FlightAPI.prototype.asyncAirports = function (query) {
  const self = this;

  return new Promise(function (success, fail) {
    self.airports(query, function (error, data) {
      if (error) fail(error);
      success(data);
    });
  });
};

FlightAPI.prototype.airportsURL = function (query) {
  return url.resolve(
    this.properties.baseURL,
    this.properties.airportsPath + '?q=' + encodeURIComponent(query)
  );
}

// @param {string} location -
//   The name of the location to to retrieve Airport codes from
FlightAPI.prototype.airportCodesFromLocation = function (location, callback) {
  this.airports(location, function (error, airportsData) {
    const airportCodes = airportsData.map(function (airport) {
      return airport.airportCode;
    })

    callback(error, airportCodes);
  });
};

// Get a list of Airport Codes for a given Location asynchronously
//
// @param {string} location -
//   The name of the location to to retrieve Airport codes from
// @returns {Promise.<object[]>} Array of Airports
FlightAPI.prototype.asyncAirportCodesFromLocation = function (location) {
  const self = this;

  return new Promise(function (success, fail) {
    self.airportCodesFromLocation(location, function (error, data) {
      if (error) fail(error);
      success(data);
    });
  });
};

// Provides a list of available flights for a single airline.
//
//     http://node.locomote.com/code-task/flight_search/QF?date=2018-09-02&from=SYD&to=JFK
//
// @param {String} airlineCode - Known internal Airline code for flightSearchURL
// @param {Object} options - The params to be passed into the flightSearchURL
// @param {string} options.form - The travel `from` location parameter
// @param {string} options.to - The travel `to` location parameter
// @param {string} options.travel_date - The travel `date` parameter
// @param {function} callback
//
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

// // Get a list of Flights for a given Airline Code, Travel Date, Airport Origin
// // and Airport Destination asynchronously
// //
// // @param {String} airlineCode - Airline Code
// // @param {Object} options - The params to be passed into the flightSearchURL
// // @param {string} options.form - Airport Origin
// // @param {string} options.to - Airport Destination
// // @param {string} options.travel_date - Travel Date
// // @returns {Promise.<object[]>} Array of Flight results
FlightAPI.prototype.asyncFlightSearch = function (airlineCode, options) {
  const self = this;

  return new Promise(function (success, fail) {
    self.flightSearch(airlineCode, options, function (error, data) {
      if (error) fail(error);
      success(data);
    });
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

// > Accepts all parameters from the search form
// >
// > For a single flight search, you will need to make multiple Flight API
// > requests:
// >
// > - `/airlines` to get a list of airlines
// > - `/flight_search/:airline_code` to search for flights for each airline
// >
// > The list of airlines may change, so caching is not an option.
//
// @param {Object} params - The params submitted by the User of the Search Form
// @param {string} params.form - The travel location; e.g. 'Melbourne'
// @param {string} params.to - The travel location; e.g. 'Sydney'
// @param {string} params.travel_date -
//   The travel `date` parameter; e.g. `YYYY-MM-DD`
//
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
