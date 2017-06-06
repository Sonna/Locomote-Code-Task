const nock = require('nock');
const request = require('request');

const describedClass = require('../../../lib/services/FlightAPI');

describe('FlightAPI library', function () {
  describe('default properties', function () {
    let subject = new describedClass();

    it('baseURL', function (done) {
      expect(subject.properties.baseURL).toEqual('http://node.locomote.com/code-task/');
      done();
    });

    it('airlinesPath', function (done) {
      expect(subject.properties.airlinesPath).toEqual('airlines');
      done();
    });

    it('airlinesURL', function (done) {
      expect(subject.airlinesURL()).toEqual('http://node.locomote.com/code-task/airlines');
      done();
    });

    it('airportsPath', function (done) {
      expect(subject.properties.airportsPath).toEqual('airports');
      done();
    });

    it('airportsURL', function (done) {
      expect(subject.airportsURL('Melbourne'))
        .toEqual('http://node.locomote.com/code-task/airports?q=Melbourne');
      done();
    });
  });

  describe('custom properties', function () {
    const baseURL = 'https://example.com/';

    let subject = new describedClass({
      baseURL: 'https://example.com/',
      airlinesPath: 'air_lines',
      airportsPath: 'air_ports'
    });

    it('baseURL', function (done) {
      expect(subject.properties.baseURL).toEqual('https://example.com/');
      done();
    });

    it('airlinesPath', function (done) {
      expect(subject.properties.airlinesPath).toEqual('air_lines');
      done();
    });

    it('airlinesURL', function (done) {
      expect(subject.airlinesURL()).toEqual('https://example.com/air_lines');
      done();
    });

    it('airportsPath', function (done) {
      expect(subject.properties.airportsPath).toEqual('air_ports');
      done();
    });

    it('airportsURL', function (done) {
      expect(subject.airportsURL('Sydney'))
        .toEqual('https://example.com/air_ports?q=Sydney');
      done();
    });
  });

  describe('airlines', function () {
    beforeEach(function () {
      const airlinesData = [
        { code: "FB", name: "FooBar" },
        { code: "SU", name: "Aeroflot" },
        { code: "MU", name: "China Eastern" },
        { code: "EK", name: "Emirates" },
        { code: "KE", name: "Korean Air lines" },
        { code: "QF", name: "Qantas" },
        { code: "SQ", name: "Singapore Airlines"}
      ];

      // Mock external request response
      nock('http://node.locomote.com')
        .get('/code-task/airlines')
        .reply(200, airlinesData);
    });

    let subject = new describedClass();

    it('returns an Array of airlines', function (done) {
      subject.airlines(function (error, data) {
        expect(data).toEqual(jasmine.any(Array));
        expect(data).not.toBeLessThan(0);

        done();
      });
    });

    it('each airline has "code" & "name"', function (done) {
      subject.airlines(function (error, data) {
        data.forEach(function (airline) {
          expect(airline.code).toEqual(jasmine.any(String));
          expect(airline.name).toEqual(jasmine.any(String));
        });

        done();
      });
    });

    it('first airline equals mock data', function (done) {
      subject.airlines(function (error, data) {
        expect(data[0]).toEqual({ code: "FB", name: "FooBar" });
        done();
      });
    });
  });

  describe('airports', function () {
    beforeEach(function () {
      // http://node.locomote.com/code-task/airports?q=Melbourne
      const melbourneAirportData = [
        {
          airportCode: "FOO",
          airportName: "Foo Pretend Airport",
          cityCode: "BAR",
          cityName: "Barfield",
          countryCode: "EU",
          countryName: "Europe",
          latitude: 12.345678,
          longitude: -109.876543,
          stateCode: "SA",
          timeZone: "Japan/Tokyo"
        },
        {
          airportCode: "MLB",
          airportName: "Melbourne International Arpt",
          cityCode: "MLB",
          cityName: "Melbourne",
          countryCode: "US",
          countryName: "United States",
          latitude: 28.102753,
          longitude: -80.645258,
          stateCode: "FL",
          timeZone: "America/New_York"
        },
        {
          airportCode: "MEL",
          airportName: "Tullamarine Arpt",
          cityCode: "MEL",
          cityName: "Melbourne",
          countryCode: "AU",
          countryName: "Australia",
          latitude: -37.673333,
          longitude: 144.843333,
          stateCode: "VI",
          timeZone: "Australia/Hobart"
        }
      ];

      nock('http://node.locomote.com')
        .get('/code-task/airports?q=Melbourne')
        .reply(200, melbourneAirportData);

      // http://node.locomote.com/code-task/airports?q=Sydney
      const sydneyAirportData = [
        {
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
        {
          airportCode: "YQY",
          airportName: "Sydney Airport",
          cityCode: "YQY",
          cityName: "Sydney",
          countryCode: "CA",
          countryName: "Canada",
          latitude: 46.161388,
          longitude: -60.047779,
          stateCode: "NS",
          timeZone: "America/Halifax"
        }
      ];

      nock('http://node.locomote.com')
        .get('/code-task/airports?q=Sydney')
        .reply(200, sydneyAirportData);
    });

    let subject = new describedClass();

    it('returns an Array of Melbourne airports', function (done) {
      subject.airports('Melbourne', function (error, data) {
        expect(data).toEqual(jasmine.any(Array));
        expect(data).not.toBeLessThan(0);

        done();
      });
    });

    it('returns an Array of Sydney airports', function (done) {
      subject.airports('Sydney', function (error, data) {
        expect(data).toEqual(jasmine.any(Array));
        expect(data).not.toBeLessThan(0);

        done();
      });
    });

    it('each airport has "code" & "name"', function (done) {
      subject.airports('Sydney', function (error, data) {
        data.forEach(function (airport) {
          expect(airport.airportCode).toEqual(jasmine.any(String));
          expect(airport.airportName).toEqual(jasmine.any(String));
          expect(airport.cityCode).toEqual(jasmine.any(String));
          expect(airport.cityName).toEqual(jasmine.any(String));
          expect(airport.countryCode).toEqual(jasmine.any(String));
          expect(airport.countryName).toEqual(jasmine.any(String));
          expect(airport.latitude).toEqual(jasmine.any(Number));
          expect(airport.longitude).toEqual(jasmine.any(Number));
          expect(airport.stateCode).toEqual(jasmine.any(String));
          expect(airport.timeZone).toEqual(jasmine.any(String));
        });

        done();
      });
    });

    it('first airport equals mock data', function (done) {
      subject.airports('Melbourne', function (error, data) {
        expect(data[0]).toEqual(        {
          airportCode: "FOO",
          airportName: "Foo Pretend Airport",
          cityCode: "BAR",
          cityName: "Barfield",
          countryCode: "EU",
          countryName: "Europe",
          latitude: 12.345678,
          longitude: -109.876543,
          stateCode: "SA",
          timeZone: "Japan/Tokyo"
        });

        done();
      });
    });
  });
});
