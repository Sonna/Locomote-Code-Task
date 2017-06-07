const nock = require('nock');
const querystring = require('querystring');
const request = require('request');
const url = require('url');

const server = require('../server.js');

const baseURL = 'http://localhost:3000/';
const airlinesURL = url.resolve(baseURL, 'airlines');
const searchURL = url.resolve(baseURL, 'search');


describe('Application Server', function () {
  describe('GET /', function () {
    it('returns status code 200', function (done) {
      request.get(baseURL, function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  describe('GET /airlines', function () {
    beforeEach(function () {
      const airlinesData = [
        { code: "BF", name: "BarFoo" },
        { code: "BB", name: "BazBar" }
      ];

      // Mock external request response
      nock('http://node.locomote.com')
        .get('/code-task/airlines')
        .reply(200, airlinesData);
    });

    it('returns status code 200', function (done) {
      request.get(airlinesURL, function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('returns an array of values', function (done) {
      request.get(airlinesURL, function (error, response, body) {
        const data = JSON.parse(body);
        expect(data).toEqual(jasmine.any(Array));
        done();
      });
    });
  });

  describe('GET /airports', function () {
    beforeEach(function () {
      // http://node.locomote.com/code-task/airports?q=Melbourne
      const melbourneAirportData = [
        { airportCode: "MLB", airportName: "Melbourne International Arpt" },
        { airportCode: "MEL", airportName: "Tullamarine Arpt" }
      ];

      nock('http://node.locomote.com')
        .get('/code-task/airports?q=Melbourne')
        .reply(200, melbourneAirportData);

      // http://node.locomote.com/code-task/airports?q=Sydney
      const sydneyAirportData = [
        { airportCode: "SYD", airportName: "Kingsford Smith" },
        { airportCode: "YQY", airportName: "Sydney Airport" }
      ];

      nock('http://node.locomote.com')
        .get('/code-task/airports?q=Sydney')
        .reply(200, sydneyAirportData);
    });

    describe('when querying Melbourne airports', function () {
      const melboruneAirportURL = url.resolve(baseURL, 'airports?q=Melbourne');

      it('returns status code 200', function (done) {
        request.get(melboruneAirportURL, function (error, response, body) {
          expect(response.statusCode).toBe(200);
          done();
        });
      });

      it('returns an array of values', function (done) {
        request.get(melboruneAirportURL, function (error, response, body) {
          const data = JSON.parse(body);
          expect(data).toEqual(jasmine.any(Array));
          done();
        });
      });

      it('returns expected first airport', function (done) {
        request.get(melboruneAirportURL, function (error, response, body) {
          const data = JSON.parse(body);
          const airport = data[0];

          expect(airport.airportCode).toEqual("MLB");
          expect(airport.airportName).toEqual("Melbourne International Arpt");
          done();
        });
      });
    });

    describe('when querying Sydney airports', function () {
      const sydneyAirportURL = url.resolve(baseURL, 'airports?q=Sydney');

      it('returns status code 200', function (done) {
        request.get(sydneyAirportURL, function (error, response, body) {
          expect(response.statusCode).toBe(200);
          done();
        });
      });

      it('returns an array of values', function (done) {
        request.get(sydneyAirportURL, function (error, response, body) {
          const data = JSON.parse(body);
          expect(data).toEqual(jasmine.any(Array));
          done();
        });
      });

      it('returns expected last airport', function (done) {
        request.get(sydneyAirportURL, function (error, response, body) {
          const data = JSON.parse(body);
          const airport = data[data.length - 1];

          expect(airport.airportCode).toEqual("YQY");
          expect(airport.airportName).toEqual("Sydney Airport");
          done();
        });
      });
    });
  });

  describe('GET /search', function () {
    beforeEach(function () {
      const airlinesData = [
        { code: "BF", name: "BarFoo" },
        { code: "BB", name: "BazBar" }
      ];

      // Mock external request response
      nock('http://node.locomote.com')
        .get('/code-task/airlines')
        .reply(200, airlinesData);

      // http://node.locomote.com/code-task/flight_search/BF?date=2018-09-02&from=SYD&to=JFK
      const barfooFlightSearchData = [
        {
          key: "UUY5MDUgMTUzNTgxMDQwMDAwMA==",
          airline: {
            code: "BF",
            name: "BarFoo"
          },
          flightNum: 905,
          start: {
            dateTime: "2018-09-02T16:42:00+10:00",
            airportCode: "SYD",
            airportName: "Kingsford Smith",
            cityCode: "SYD",
            cityName: "Sydney",
            countryCode: "AU",
            countryName: "Australia",
            latitude: -33.946111,
            longitude: 151.177222,
            stateCode: "NS",
            timeZone: "Australia/Sydney"
          },
          finish: {
            dateTime: "2018-09-02T22:43:00-04:00",
            airportCode: "JFK",
            airportName: "John F Kennedy Intl",
            cityCode: "NYC",
            cityName: "New York",
            countryCode: "US",
            countryName: "United States",
            latitude: 40.639751,
            longitude: -73.778925,
            stateCode: "NY",
            timeZone: "America/New_York"
          },
          plane: {
            code: "74H",
            shortName: "Boeing 747-8",
            fullName: "Boeing 747-8",
            manufacturer: "Boeing",
            model: "747-8 Intercontinental"
          },
          distance: 16014,
          durationMin: 1201,
          price: 34560.24
        }
      ];

      nock('http://node.locomote.com')
        .get('/code-task/flight_search/BF?date=2018-09-02&from=SYD&to=JFK')
        .reply(200, barfooFlightSearchData);

      nock('http://node.locomote.com')
        .get('/code-task/flight_search/BB?date=2018-09-02&from=SYD&to=JFK')
        .reply(400);
    });

    // const date = '2018-09-02';
    // const from = 'SYD';
    // const to = 'JFK';
    // const params = { date: date, from: from, to: to };
    // const stringifyParams = querystring.stringify(params);
    // const searchParamsURL = searchURL + stringifyParams;
    const searchParamsURL = searchURL + "?date=2018-09-02&from=SYD&to=JFK";

    it('returns an Array of searched flights', function (done) {
      this.requestPromise(searchParamsURL, true)
        .then(function (body) {
          expect(body).toEqual(jasmine.any(Array));
          expect(body).not.toBeLessThan(0);

          done();
        });
    });

    it('returns expected mock data', function (done) {
      this.requestPromise(searchParamsURL, true)
        .then(function (body) {
          const searchResult = body.find(function (flight) {
            return flight.key === 'UUY5MDUgMTUzNTgxMDQwMDAwMA==';
          });

          expect(searchResult).toEqual({
            key: "UUY5MDUgMTUzNTgxMDQwMDAwMA==",
            airline: {
              code: "BF",
              name: "BarFoo"
            },
            flightNum: 905,
            start: {
              dateTime: "2018-09-02T16:42:00+10:00",
              airportCode: "SYD",
              airportName: "Kingsford Smith",
              cityCode: "SYD",
              cityName: "Sydney",
              countryCode: "AU",
              countryName: "Australia",
              latitude: -33.946111,
              longitude: 151.177222,
              stateCode: "NS",
              timeZone: "Australia/Sydney"
            },
            finish: {
              dateTime: "2018-09-02T22:43:00-04:00",
              airportCode: "JFK",
              airportName: "John F Kennedy Intl",
              cityCode: "NYC",
              cityName: "New York",
              countryCode: "US",
              countryName: "United States",
              latitude: 40.639751,
              longitude: -73.778925,
              stateCode: "NY",
              timeZone: "America/New_York"
            },
            plane: {
              code: "74H",
              shortName: "Boeing 747-8",
              fullName: "Boeing 747-8",
              manufacturer: "Boeing",
              model: "747-8 Intercontinental"
            },
            distance: 16014,
            durationMin: 1201,
            price: 34560.24
          });

          done();
        });
    });
  });
});
