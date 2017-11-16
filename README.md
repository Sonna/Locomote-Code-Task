# JS code task

## Usage

[Install Node][Install Node] and its dependencies, to setup project:

```console
  $ npm install
```

<!-- References -->
[Install Node]: https://nodejs.org/en/download/ "Download | Node.js"

## Front end (part 1)

You are building a flight search interface.

Create a search form with three fields:

 1. From location (eg: Sydney)
 2. To location (eg: Heathrow)
 3. Travel date (eg: 2016-09-02)

When the user clicks search, your front end code needs to make an AJAX request
to a small backend server you will build, which will in turn contact the Flight
API.

### Returning home

Most travellers want to return home.

Demonstrate the reusability of your UI components by adding a second search
interface on the same page as the first one.

The traveller would use this to find a return flight home.

Both search interfaces should be able to work concurrently & independently of
each other.

You don't need to present all information returned by the flight search.

Show what you think is relevant to the user.

### Important
- Don't use any frameworks like Angular, Vuejs, Redux, React or similar. Build
  from the ground up.
  You may use utility libraries like jQuery, Bootstrap, lodash, moment.js,
  autocomplete or similar.

- Vanilla Javascript, Typescript & Coffeescript can all be used.

- Your solution will be tested in ES6+ browsers like Chrome & Firefox. No need
  for legacy browser support.

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

Important:
  Stick to small frameworks like expressjs, koa, or similar.
  The backend should be built with nodejs 8 or above.
  The list of airlines & airports may change, so caching or storing these is not
  an option.

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

## Expectations

- Documentation is not necessary; try to write self documenting code & document
  only where required.

- We're looking for well structured & reusable code.

### Submission

Please send us a zip/gz/link to repository with your solution.

Provide a `start.sh` or `start.bat` script in the root folder which will perform
all required package installation, and launch the server on port 3000.

Entries will be tested against node version 8 or newer.
