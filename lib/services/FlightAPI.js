const querystring = require('querystring');
const request = require('request');
const requestPromise = require('request-promise-native');
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

// Get a list of Flights for a given Airline Code, Travel Date, Airport Origin
// and Airport Destination asynchronously
//
// @param {String} airlineCode - Airline Code
// @param {Object} options - The params to be passed into the flightSearchURL
// @param {string} options.form - Airport Origin
// @param {string} options.to - Airport Destination
// @param {string} options.travel_date - Travel Date
// @returns {Promise.<object[]>} Array of Flight results
FlightAPI.prototype._asyncFlightSearch = function (airlineCode, options) {
  const self = this;
  const uri = this.flightSearchURL(airlineCode, options);
  const requestOptions = { uri: uri, json: true };

  return requestPromise.get(requestOptions)
    .catch(function(error) {
      // Ignore `invalid airline` on Bad Request and return an empty array
      return [];
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

FlightAPI.prototype.asyncCurriedFlightSearch = function (airlineCode) {
  const self = this;

  return new Promise(function (success, fail) {
    // if (error) fail(error);
    success(function(from) {
      return new Promise(function (success, fail) {
        // if (error) fail(error);
        success(function(to) {
          return new Promise(function (success, fail) {
            // if (error) fail(error);
            success(function(travelDate) {
              return new Promise(function (success, fail) {
                success(self.asyncFlightSearch(airlineCode, { date: travelDate, from: from, to: to }));
                // self.flightSearch(airlineCode, { date: travelDate, from: from, to: to }, function (error, data) {
                //   // if (error) fail(error);
                //   success(data);
                // });
              });
            });
          });
        });
      });
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
// @param {string} params.date - The travel `date` parameter; e.g. `YYYY-MM-DD`
//
// ```
//     [Input]
//       from: 'Melbourne'
//       to:   'Sydney'
//       date: '2017-06-13'
//
//     [getAirlines]
//       airlines: ["FB", "SU", "MU", "EK", "KE", "QF", "SQ", ...]
//
//     [getAirportCodes]
//       fromAirports: 'Melbourne' -> ['MLB', 'MEL']
//       toAirports:   'Sydney'    -> ['SYD', 'YQY']
//
//     [search]
//       airlines.forEach((airline) ->
//         fromAirportsforEach((from) ->
//           toAirportsforEach((to) ->
//             search(airline.code, from, to, date)
//           )
//         )
//       )
// ```
FlightAPI.prototype.curriedSearch = function (params, callback) {
// FlightAPI.prototype.search = function (params, callback) {
  const self = this;

  this.asyncSearchPreamble(params).then(function (searchData) {
    return Promise.all({
      searchData: searchData,
      flightSearchesWithAirlineCodes:
        Promise.all(searchData.airlines.map(function(airline) {
          return self.asyncCurriedFlightSearch(airline.code);
        }))
    });
  }).then(function (results) {
    const searchData = results.searchData;
    const flightSearchesWithAirlineCodes = results.flightSearchesWithAirlineCodes;

    return Promise.all({
      searchData: searchData,
      flightSearchesWithFromAirports:
        Promise.all(flightSearchesWithAirlineCodes.reduce(function(accumulator, flightSearch) {
          return accumulator.concat(searchData.fromAirports.map(function(fromAirport) {
            return flightSearch(fromAirport)
          }));
        }, []))
    });
  }).then(function (results) {
    const searchData = results.searchData;
    const flightSearchesWithFromAirports = results.flightSearchesWithFromAirports;

    return Promise.all({
      searchData: searchData,
      flightSearchesWithFromAirports:
        Promise.all(flightSearchesWithFromAirports.reduce(function(accumulator, flightSearch) {
          return accumulator.concat(searchData.toAirports.map(function(toAirport) {
            return flightSearch(toAirport);
          }));
        }, []))
    });
  }).then(function (results) {
    const searchData = results.searchData;
    const flightSearchesWithToAirports = results.flightSearchesWithToAirports;

    return Promise.all(flightSearchesWithToAirports.reduce(function(accumulator, flightSearch) {
      return accumulator.concat(flightSearch(searchData.travelDate));
    }, []));
  }).then(function (flightSearchesResults) {
    // Flatten array of array results (and remove empty arrays)
    return flightSearchesResults.reduce(function (a, b) { return a.concat(b); }, []);
  }).then(function (filteredResults) {
    callback(null, filteredResults);
  }).catch(function (error) {
    callback(error, []);
  });
};

FlightAPI.prototype.search = function (params, callback) {
  const self = this;
  const fromLocation = params.from;
  const toLocation = params.to;
  const travelDate = params.date;

  Promise.all([
    this.asyncAirlines(),
    this.asyncAirportCodesFromLocation(fromLocation),
    this.asyncAirportCodesFromLocation(toLocation)
  ]).then(function(airlinesAndPortCodesData) {
    const allAirlines = airlinesAndPortCodesData[0];
    const fromAirports = airlinesAndPortCodesData[1];
    const toAirports = airlinesAndPortCodesData[2];

    return {
      airlines: allAirlines,
      fromAirports: fromAirports,
      toAirports: toAirports,
      travelDate: travelDate
    };
  }).then(function (searchData) {
  // this.asyncSearchPreamble(params).then(function (searchData) {
    let results = [];

    searchData.airlines.forEach(function(airline) {
      searchData.fromAirports.forEach(function(fromAirport) {
        searchData.toAirports.forEach(function(toAirport) {
          const options = {
            date: searchData.travelDate,
            from: fromAirport,
            to: toAirport
          };

          let nextResult = self.asyncFlightSearch(airline.code, options);
          results.push(nextResult);
        })
      })
    });
    return Promise.all(results);
  }).then(function (flightSearchesResults) {
    // Flatten array of array results (and remove empty arrays)
    return flightSearchesResults.reduce(function (a, b) { return a.concat(b); }, []);
  }).then(function (filteredResults) {
    callback(null, filteredResults);
  }).catch(function (error) {
    callback(error, []);
  });
};

module.exports = FlightAPI;
