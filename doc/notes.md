# JS code task

## Front end (part 1)

You are building a flight search interface.

Create a search form with three fields:

 1. From location (eg: Sydney)
 2. To location (eg: Heathrow)
 3. Travel date (eg: 2016-09-02)

When the user clicks search, your front end code needs to make an AJAX request
to a small backend server you will build, which will in turn contact the Flight
API.

```html
<!DOCTYPE html>
<html>
<head>
  <title>JS code task</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font: 13px Helvetica, Arial; }
    form { padding: 3px; }
    form label { margin: 10px; }
    form input { margin: 10px; padding: 10px; }
  </style>
  <!-- <script type="text/javascript" src="/app.js" /> -->
  <script type="text/javascript">
    window.onload = function () {
      var form = document.getElementById("search");
      var results_el = document.getElementById("results");

      form.onclick = function() {
        var request = new XMLHttpRequest();
        request.open('GET', this.getAttribute('action'), true);

        request.onload = function() {
          if (request.status >= 200 && request.status < 400) {
            // Success!
            var data = JSON.parse(request.responseText);
          } else {
            // We reached our target server, but it returned an error

          }
        };

        request.onerror = function() {
          // There was a connection error of some sort
        };

        request.send();

        // var results = request.responseText.map(function(result) {
        //   return "<li>" + result + "</li>";
        // });
        // results_el.append(results);
      };
    };
  </script>
</head>
<body>
  <form id="search" action="/search">
    <label for="from">From location</label>
    <input type="text" name="from">
    <label for="to">To location</label>
    <input type="text" name="to">
    <label for="travel_date">Travel date</label>
    <input type="text" name="travel_date">
    <input type="submit" value="Search">
  </form>
  <ul id="results">
  </ul>
</body>
</html>
```

### Usability

Flights may be cheaper on some days than others; If the user picks
**`2016-09-10`** as their travel date, then query their chosen date and nearby
dates (+/- 2):

`2016-09-08`, `2016-09-09`, **`2016-09-10`**, `2016-09-11`, `2016-09-12`

A great way to present all five days of results would be by using tabs.

You don't need to present all information returned by the flight search.
Show what you think is relevant to the user.

Important:
  - Don't use any frameworks based on React, Angular or similar.

    You may however use utility libraries like jQuery/UI, Bootstrap, lodash &
    moment.js.

  - We use coffeescript, however you can also use plain javascript or
    typescript.

  - Do not render HTML on the server; send data to the frontend and render it
    there.

## Back end (part 2)

Build a back end server which has three endpoints:

 1. `/airlines`
    Lists all available airlines from the Flight API.

 2. `/airports`
    Lists all matching airports from the Flight API.

 3. `/search`
    Accepts all parameters from the search form above.

    For a single flight search, you will need to make multiple Flight API
    requests:

    + `/airlines` to get a list of airlines
    + `/flight_search/:airline_code` to search for flights for each airline

    The list of airlines may change, so caching is not an option.

Important:
  Stick to small frameworks like expressjs, koa, sinatra, tornado or similar.
  We use node.js, however you're free to use ruby, python or similar.

```javascript
const express = require('express');
const FlightAPI = require(__dirname + '/services/FlightAPI');
const app = express();

app.use("/", express.static(__dirname + '/public'));

// Lists all available airlines from the Flight API.
app.get('/airlines', function (req, res) {
  var airlines = FlightAPI.airlines(query, function(status, data) {
    return data;
    // res.send(status, airlines);
  });
  res.send(200, airlines);
})

// Lists all matching airports from the Flight API.
app.get('/airports', function (req, res) {
  var query = req.params.q;
  var airports = FlightAPI.airports(query, function(status, data) {
    return data;
    // res.send(status, airports);
  });
  res.send(200, airports);
})

// Accepts all parameters from the search form
app.get('/search', function (req, res) {
  // req.params
  // /search?from=Melbourne&to=Sydney&travel_date=2017-06-05
  var from = req.query.from;
  var to = req.query.to;
  var travelDate = req.query.travel_date;

  let options = {date: travelDate, from: from, to: to};

  // FlightAPI.airlines(airlineCode, date, from, to, callback, function(status, data) {
  // FlightAPI.airlines(date, from, to, callback, function(status, data) {
  FlightAPI.airlines(options, callback, function(status, data) {
    return data;
    // res.send(status, airlines);
  });
  res.send(200, airlines);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
```

## Flight API (provided)

Please use our Flight API to complete this task.

It has three endpoints:

- `airlines`

  Provides a list of airlines. Takes no parameters.
  The airline codes from the response is required for the flight search.
  Example request: [`airlines`](http://node.locomote.com/code-task/airlines)


- `airports`

  Provides an airport search.

  Query parameters:
  + `q` - text based search param

  The `airportCode` from the response is required for the flight search.

  Example request: [`airports?q=Melbourne`](http://node.locomote.com/code-task/airports?q=Melbourne)


- `flight_search/:airline_code`

  Provides a list of available flights for a single airline.

  URL parameters:
  + `airline_code` - airline code from the airlines endpoint

  Query parameters:
  + `date` departure date, `YYYY-MM-DD`
  + `from` origin airport code, eg: `SYD`
  + `to` destination airport code, eg: `JFK`

  Example request:
  [`flight_search/QF?date=2018-09-02&from=SYD&to=JFK`](http://node.locomote.com/code-task/flight_search/QF?date=2018-09-02&from=SYD&to=JFK)

```javascript
// services/FlightAPI.js
// var exports = module.exports = {};

const http = require('http');

const default_options = {
  hostname: 'node.locomote.com',
  port: 80,
  path: '/code-task',
  method: 'GET',
  // headers: {
  //   'Content-Type': 'application/json',
  //   // 'Content-Length': Buffer.byteLength(getData)
  // }
};

// Provides a list of airlines. Takes no parameters.
//
//     http://node.locomote.com/code-task/airlines
exports.airlines = function (callback) {
  // var options = Object.assign(
  //   default_options,
  //   { path: '/code-task/airlines' }
  // );
  var options = {
    ...default_options,
    path: '/code-task/airlines'
  };

  return http.get(options, function(response) {
    var body = '';
    response.on('data', function(d) {
      body += d;
    });

    response.on('end', function() {
      var parsed = JSON.parse(body);
      callback(response.statusCode, parsed);
    });
  }).on('error', function(e) {
    response.send('error: ' + err.message)
  }).end();
}

// Provides an airport search.
//
//     http://node.locomote.com/code-task/airports?q=Melbourne
exports.airports = function (q, callback) {
  var options = {
    ...default_options,
    path: '/code-task/airports?q=' + encodeURIComponent(q)
  };

  return http.get(options, function(response) {
    var body = '';
    response.on('data', function(d) {
      body += d;
    });

    response.on('end', function() {
      var parsed = JSON.parse(body);
      callback(response.statusCode, parsed);
    });
  }).on('error', function(e) {
    response.send('error: ' + err.message)
  }).end();
}

// Provides a list of available flights for a single airline.
//
//     http://node.locomote.com/code-task/flight_search/QF?date=2018-09-02&from=SYD&to=JFK
// exports.flightSearch = function (airlineCode, date, from, to, callback) {
// exports.flightSearch = function (airlineCode, options, callback) {
exports.flightSearch = function (options, callback) {
  // airlineCode = (typeof airlineCode === 'undefined') ? '' : airlineCode;
  airlineCodes = exports.airports(function(status, data) {
   return data;
  }).map(function(data) { return data.code });
  // let options = {date: date, from: from, to: to};

  let urlParams = Object.keys(options).map(function(k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(options[k])
  }).join('&');

  return airlineCodes.map(
    var options = {
      ...default_options,
      path: '/code-task/flight_search/' + airlineCode + '?' + urlParams
    };

    return http.get(options, function(response) {
      var body = '';
      response.on('data', function(d) {
        body += d;
      });

      response.on('end', function() {
        var parsed = JSON.parse(body);
        // callback(response.statusCode, parsed);
        return parsed;
      });
    }).on('error', function(e) {
      response.send('error: ' + err.message)
    }).end();
  );
}
```

## Expectations

- Documentation is not necessary; try to write self documenting code & document
  only where required.

- We're looking for well structured & architected code (but please don't build
  something turing complete).

### Submission

Please send us a zip/gz/link to repository with your solution.

Provide a `start.sh` script in the root folder which will perform all required
package installation, and launch the server on port 3000.

## Mistakens and assumptions

I failed to initially see the conversion process from Location of Airport, to
Airport codes, to then later query the FlightAPI as;

- [`flight_search/QF?date=2018-09-02&from=SYD&to=JFK`](http://node.locomote.com/code-task/flight_search/QF?date=2018-09-02&from=SYD&to=JFK)

Not

- [`flight_search/QF?date=2018-09-02&from=Sydney&to=New%20York`](http://node.locomote.com/code-task/flight_search/QF?date=2018-09-02&from=Sydney&to=New%20York)

This meant I had to go back through a fix this broken assumption and update the
Search Form and `search` API async callbacks to add in this extra step first to
make the final process look something like the following:

```
[Input]
  from: 'Melbourne'
  to:   'Sydney'
  date: '2017-06-13'

[getAirportCodes]
  fromAirports: 'Melbourne' -> ['MLB', 'MEL']
  toAirports:   'Sydney'    -> ['SYD', 'YQY']

[getAirlines]
  airlines: ["FB", "SU", "MU", "EK", "KE", "QF", "SQ", ...]

[search]
  airlines.forEach((airline) ->
    fromAirportsforEach((from) ->
      toAirportsforEach((to) ->
        search(airline.code, from, to, date)
      )
    )
  )
```
