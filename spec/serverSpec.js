const nock = require('nock');
const request = require('request');
const url = require('url');

const server = require('../server.js');

const baseURL = 'http://localhost:3000/';
const airlinesURL = url.resolve(baseURL, 'airlines');


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
});
