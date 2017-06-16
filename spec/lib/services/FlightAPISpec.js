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

    it('flightSearchPath', function (done) {
      expect(subject.properties.flightSearchPath).toEqual('flight_search');
      done();
    });

    it('flightSearchURL', function (done) {
      const date = '2010-10-10';
      const from = 'JFK';
      const to = 'SYD';
      const params = { date: date, from: from, to: to };

      expect(subject.flightSearchURL('QF', params))
        .toEqual('http://node.locomote.com/code-task/flight_search/QF?date=2010-10-10&from=JFK&to=SYD');
      done();
    });
  });

  describe('custom properties', function () {
    const baseURL = 'https://example.com/';

    let subject = new describedClass({
      baseURL: 'https://example.com/',
      airlinesPath: 'air_lines',
      airportsPath: 'air_ports',
      flightSearchPath: 'flightsearch'
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

    it('flightSearchPath', function (done) {
      expect(subject.properties.flightSearchPath).toEqual('flightsearch');
      done();
    });

    it('flightSearchURL', function (done) {
      const date = '2011-12-13';
      const from = 'MLB';
      const to = 'TKY';
      const params = { date: date, from: from, to: to };

      expect(subject.flightSearchURL('FB', params))
        .toEqual('https://example.com/flightsearch/FB?date=2011-12-13&from=MLB&to=TKY');
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

describe('asyncAirlines', function () {
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
      subject.asyncAirlines()
      .then(function (data) {
        expect(data).toEqual(jasmine.any(Array));
        expect(data).not.toBeLessThan(0);

        done();
      });
    });

    it('each airline has "code" & "name"', function (done) {
      subject.asyncAirlines()
        .then(function (data) {
          data.forEach(function (airline) {
            expect(airline.code).toEqual(jasmine.any(String));
            expect(airline.name).toEqual(jasmine.any(String));
          });

        done();
      });
    });

    it('first airline equals mock data', function (done) {
      subject.asyncAirlines()
      .then(function (data) {
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
        // .query({ q: 'Melbourne' })
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
        // .query({ q: 'Sydney' })
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

    it('each airport has properties', function (done) {
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
        expect(data[0]).toEqual({
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
        });

        done();
      });
    });

    it('returns an array of airport codes for Melbourne', function (done) {
      subject.airportCodesFromLocation('Melbourne', function (error, data) {
        expect(data).toEqual(['MLB', 'MEL'])
      });

      done();
    });

    it('returns an array of airport codes for Sydney', function (done) {
      subject.airportCodesFromLocation('Sydney', function (error, data) {
        expect(data).toEqual(['SYD', 'YQY'])
      });

      done();
    });
  });


  describe('asyncAirports', function () {
    beforeEach(function () {
      // http://node.locomote.com/code-task/airports?q=Melbourne
      const melbourneAirportData = [
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
        // .query({ q: 'Melbourne' })
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
        // .query({ q: 'Sydney' })
        .reply(200, sydneyAirportData);
    });

    let subject = new describedClass();

    it('returns an Array of Melbourne airports asynchronously', function (done) {
      subject.asyncAirports('Melbourne')
        .then(function (data) {
          expect(data).toEqual(jasmine.any(Array));
          expect(data).not.toBeLessThan(0);

          done();
        });
    });

    it('returns an Array of Sydney airports asynchronously', function (done) {
      subject.asyncAirports('Sydney')
        .then(function (data) {
          expect(data).toEqual(jasmine.any(Array));
          expect(data).not.toBeLessThan(0);

          done();
        });
    });

    it('each airport has properties asynchronously', function (done) {
      subject.asyncAirports('Sydney')
        .then(function (data) {
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

    it('first airport equals mock data asynchronously', function (done) {
      subject.asyncAirports('Melbourne')
        .then(function (data) {
          expect(data[0]).toEqual({
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
          });

          done();
        });
    });

    it('returns an array of airport codes for Melbourne asynchronously', function (done) {
      subject.asyncAirportCodesFromLocation('Melbourne').then(
        function (data) {
          expect(data).toEqual(['MLB', 'MEL'])
        });

        done();
      });

    it('returns an array of airport codes for Sydney asynchronously', function (done) {
      subject.asyncAirportCodesFromLocation('Sydney').then(
        function (data) {
          expect(data).toEqual(['SYD', 'YQY'])
        });

        done();
      });
  });

  describe('flightSearch', function () {
    beforeEach(function () {
      // http://node.locomote.com/code-task/flight_search/QF?date=2018-09-02&from=SYD&to=JFK
      const melbourneFlightData = [
        {
          key: "UUY0MTkgMTUzNTgxMDQwMDAwMA==",
          airline: {
            code: "QF",
            name: "Qantas"
          },
          flightNum: 419,
          start: {
            dateTime: "2018-09-02T23:58:00+10:00",
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
            dateTime: "2018-09-03T05:59:00-04:00",
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
            code: "380",
            shortName: "Airbus A380",
            fullName: "Airbus Industrie A380",
            manufacturer: "Airbus",
            model: "A380"
          },
          distance: 16014,
          durationMin: 1201,
          price: 2116.63
        }
      ];

      // http://node.locomote.com/code-task/flight_search/QF?date=2018-09-02&from=SYD&to=JFK
      nock('http://node.locomote.com')
        .get('/code-task/flight_search/QF?date=2018-09-02&from=SYD&to=JFK')
        // .query({ date: '2018-09-02', from: 'SYD', to: 'JFK' })
        .reply(200, melbourneFlightData);
    });

    let subject = new describedClass();
    const airlineCode = 'QF';
    const date = '2018-09-02';
    const from = 'SYD';
    const to = 'JFK';
    const params = { date: date, from: from, to: to };

    it('returns an Array of flights for airlineCode', function (done) {
      subject.flightSearch(airlineCode, params, function (error, data) {
        expect(data).toEqual(jasmine.any(Array));
        expect(data).not.toBeLessThan(0);

        done();
      });
    });

    it('each flight has properties', function (done) {
      subject.flightSearch(airlineCode, params, function (error, data) {
        data.forEach(function (searchResult) {
          expect(searchResult.key).toEqual(jasmine.any(String));
          expect(searchResult.airline).toEqual(jasmine.any(Object));
          expect(searchResult.airline.code).toEqual(jasmine.any(String));
          expect(searchResult.airline.name).toEqual(jasmine.any(String));

          expect(searchResult.flightNum).toEqual(jasmine.any(Number));

          expect(searchResult.start).toEqual(jasmine.any(Object));
          expect(searchResult.start.dateTime).toEqual(jasmine.any(String));
          expect(searchResult.start.airportCode).toEqual(jasmine.any(String));
          expect(searchResult.start.airportName).toEqual(jasmine.any(String));
          expect(searchResult.start.cityCode).toEqual(jasmine.any(String));
          expect(searchResult.start.cityName).toEqual(jasmine.any(String));
          expect(searchResult.start.countryCode).toEqual(jasmine.any(String));
          expect(searchResult.start.countryName).toEqual(jasmine.any(String));
          expect(searchResult.start.latitude).toEqual(jasmine.any(Number));
          expect(searchResult.start.longitude).toEqual(jasmine.any(Number));
          expect(searchResult.start.stateCode).toEqual(jasmine.any(String));
          expect(searchResult.start.timeZone).toEqual(jasmine.any(String));

          expect(searchResult.finish).toEqual(jasmine.any(Object));
          expect(searchResult.finish.dateTime).toEqual(jasmine.any(String));
          expect(searchResult.finish.airportCode).toEqual(jasmine.any(String));
          expect(searchResult.finish.airportName).toEqual(jasmine.any(String));
          expect(searchResult.finish.cityCode).toEqual(jasmine.any(String));
          expect(searchResult.finish.cityName).toEqual(jasmine.any(String));
          expect(searchResult.finish.countryCode).toEqual(jasmine.any(String));
          expect(searchResult.finish.countryName).toEqual(jasmine.any(String));
          expect(searchResult.finish.latitude).toEqual(jasmine.any(Number));
          expect(searchResult.finish.longitude).toEqual(jasmine.any(Number));
          expect(searchResult.finish.stateCode).toEqual(jasmine.any(String));
          expect(searchResult.finish.timeZone).toEqual(jasmine.any(String));

          expect(searchResult.plane).toEqual(jasmine.any(Object));
          expect(searchResult.plane.code).toEqual(jasmine.any(String));
          expect(searchResult.plane.shortName).toEqual(jasmine.any(String));
          expect(searchResult.plane.fullName).toEqual(jasmine.any(String));
          expect(searchResult.plane.manufacturer).toEqual(jasmine.any(String));
          expect(searchResult.plane.model).toEqual(jasmine.any(String));

          expect(searchResult.distance).toEqual(jasmine.any(Number));
          expect(searchResult.durationMin).toEqual(jasmine.any(Number));
          expect(searchResult.price).toEqual(jasmine.any(Number));
        });

        done();
      });
    });

    it('first result equals mock data', function (done) {
      subject.flightSearch(airlineCode, params, function (error, data) {
        expect(data[0]).toEqual({
          key: "UUY0MTkgMTUzNTgxMDQwMDAwMA==",
          airline: {
            code: "QF",
            name: "Qantas"
          },
          flightNum: 419,
          start: {
            dateTime: "2018-09-02T23:58:00+10:00",
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
            dateTime: "2018-09-03T05:59:00-04:00",
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
            code: "380",
            shortName: "Airbus A380",
            fullName: "Airbus Industrie A380",
            manufacturer: "Airbus",
            model: "A380"
          },
          distance: 16014,
          durationMin: 1201,
          price: 2116.63
        });

        done();
      });
    });
  });

  describe('asyncFlightSearch', function () {
    beforeEach(function () {
      // http://node.locomote.com/code-task/flight_search/QF?date=2018-09-02&from=SYD&to=JFK
      const melbourneFlightData = [
        {
          key: "UUY0MTkgMTUzNTgxMDQwMDAwMA==",
          airline: {
            code: "QF",
            name: "Qantas"
          },
          flightNum: 419,
          start: {
            dateTime: "2018-09-02T23:58:00+10:00",
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
            dateTime: "2018-09-03T05:59:00-04:00",
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
            code: "380",
            shortName: "Airbus A380",
            fullName: "Airbus Industrie A380",
            manufacturer: "Airbus",
            model: "A380"
          },
          distance: 16014,
          durationMin: 1201,
          price: 2116.63
        }
      ];

      // http://node.locomote.com/code-task/flight_search/QF?date=2018-09-02&from=SYD&to=JFK
      nock('http://node.locomote.com')
        .get('/code-task/flight_search/QF?date=2018-09-02&from=SYD&to=JFK')
        // .query({ date: '2018-09-02', from: 'SYD', to: 'JFK' })
        .reply(200, melbourneFlightData);
    });

    let subject = new describedClass();
    const airlineCode = 'QF';
    const date = '2018-09-02';
    const from = 'SYD';
    const to = 'JFK';
    const params = { date: date, from: from, to: to };

    it('returns an Array of flights for airlineCode', function (done) {
      subject.asyncFlightSearch(airlineCode, params)
        .then(function (data) {
          expect(data).toEqual(jasmine.any(Array));
          expect(data).not.toBeLessThan(0);

          done();
        });
    });

    it('each flight has properties', function (done) {
      subject.asyncFlightSearch(airlineCode, params)
        .then(function (data) {
          data.forEach(function (searchResult) {
            expect(searchResult.key).toEqual(jasmine.any(String));
            expect(searchResult.airline).toEqual(jasmine.any(Object));
            expect(searchResult.airline.code).toEqual(jasmine.any(String));
            expect(searchResult.airline.name).toEqual(jasmine.any(String));

            expect(searchResult.flightNum).toEqual(jasmine.any(Number));

            expect(searchResult.start).toEqual(jasmine.any(Object));
            expect(searchResult.start.dateTime).toEqual(jasmine.any(String));
            expect(searchResult.start.airportCode).toEqual(jasmine.any(String));
            expect(searchResult.start.airportName).toEqual(jasmine.any(String));
            expect(searchResult.start.cityCode).toEqual(jasmine.any(String));
            expect(searchResult.start.cityName).toEqual(jasmine.any(String));
            expect(searchResult.start.countryCode).toEqual(jasmine.any(String));
            expect(searchResult.start.countryName).toEqual(jasmine.any(String));
            expect(searchResult.start.latitude).toEqual(jasmine.any(Number));
            expect(searchResult.start.longitude).toEqual(jasmine.any(Number));
            expect(searchResult.start.stateCode).toEqual(jasmine.any(String));
            expect(searchResult.start.timeZone).toEqual(jasmine.any(String));

            expect(searchResult.finish).toEqual(jasmine.any(Object));
            expect(searchResult.finish.dateTime).toEqual(jasmine.any(String));
            expect(searchResult.finish.airportCode).toEqual(jasmine.any(String));
            expect(searchResult.finish.airportName).toEqual(jasmine.any(String));
            expect(searchResult.finish.cityCode).toEqual(jasmine.any(String));
            expect(searchResult.finish.cityName).toEqual(jasmine.any(String));
            expect(searchResult.finish.countryCode).toEqual(jasmine.any(String));
            expect(searchResult.finish.countryName).toEqual(jasmine.any(String));
            expect(searchResult.finish.latitude).toEqual(jasmine.any(Number));
            expect(searchResult.finish.longitude).toEqual(jasmine.any(Number));
            expect(searchResult.finish.stateCode).toEqual(jasmine.any(String));
            expect(searchResult.finish.timeZone).toEqual(jasmine.any(String));

            expect(searchResult.plane).toEqual(jasmine.any(Object));
            expect(searchResult.plane.code).toEqual(jasmine.any(String));
            expect(searchResult.plane.shortName).toEqual(jasmine.any(String));
            expect(searchResult.plane.fullName).toEqual(jasmine.any(String));
            expect(searchResult.plane.manufacturer).toEqual(jasmine.any(String));
            expect(searchResult.plane.model).toEqual(jasmine.any(String));

            expect(searchResult.distance).toEqual(jasmine.any(Number));
            expect(searchResult.durationMin).toEqual(jasmine.any(Number));
            expect(searchResult.price).toEqual(jasmine.any(Number));
          });

          done();
        });
    });

    it('first result equals mock data', function (done) {
      subject.asyncFlightSearch(airlineCode, params)
        .then(function (data) {
          expect(data[0]).toEqual({
            key: "UUY0MTkgMTUzNTgxMDQwMDAwMA==",
            airline: {
              code: "QF",
              name: "Qantas"
            },
            flightNum: 419,
            start: {
              dateTime: "2018-09-02T23:58:00+10:00",
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
              dateTime: "2018-09-03T05:59:00-04:00",
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
              code: "380",
              shortName: "Airbus A380",
              fullName: "Airbus Industrie A380",
              manufacturer: "Airbus",
              model: "A380"
            },
            distance: 16014,
            durationMin: 1201,
            price: 2116.63
          });

          done();
        });
    });
  });

  describe('search', function () {
    beforeEach(function () {
      // http://node.locomote.com/code-task/airlines
      const airlinesData = [
        { code: "FB", name: "FooBar" },
        { code: "SU", name: "Aeroflot" },
        { code: "MU", name: "China Eastern" },
        { code: "EK", name: "Emirates" },
        { code: "KE", name: "Korean Air lines" },
        { code: "QF", name: "Qantas" },
        { code: "SQ", name: "Singapore Airlines" }
      ];

      // Mock external request response
      nock('http://node.locomote.com')
        .get('/code-task/airlines')
        .reply(200, airlinesData);

      const sydneyAirportsData = [{
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
      }];

      nock('http://node.locomote.com')
        .get('/code-task/airports?q=Sydney')
        // .query({ q: 'Sydney' })
        .reply(200, sydneyAirportsData);

      const newyorkAirportsData = [{
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
      }];

      nock('http://node.locomote.com')
        .get('/code-task/airports?q=New%20York')
        // .query({ q: 'New York' })
        .reply(200, newyorkAirportsData);

      // http://node.locomote.com/code-task/flight_search/FB?date=2018-09-02&from=SYD&to=JFK
      const foobarFlightSearchData = [
        {
          key: "DDY5MDUgMTUzNTgxMDQwMDAwMA==",
          airline: {
            code: "FB",
            name: "FooBar"
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
          price: 2798.42
        }
      ];

      nock('http://node.locomote.com')
        .get('/code-task/flight_search/FB?date=2018-09-02&from=SYD&to=JFK')
        // .query({ date: '2018-09-02', from: 'SYD', to: 'JFK' })
        .reply(200, foobarFlightSearchData);

      nock('http://node.locomote.com')
        .get('/code-task/flight_search/FB?date=2018-09-02&from=YQY&to=JFK')
        // .query({ date: '2018-09-02', from: 'YQY', to: 'JFK' })
        .reply(404)

      // http://node.locomote.com/code-task/flight_search/QF?date=2018-09-02&from=SYD&to=JFK
      const melbourneFlightSearchData = [
        {
          key: "UUY0MTkgMTUzNTgxMDQwMDAwMA==",
          airline: {
            code: "QF",
            name: "Qantas Pandas"
          },
          flightNum: 419,
          start: {
            dateTime: "2018-09-02T23:58:00+10:00",
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
            dateTime: "2018-09-03T05:59:00-04:00",
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
            code: "380",
            shortName: "Airbus A380",
            fullName: "Airbus Industrie A380",
            manufacturer: "Airbus",
            model: "A380"
          },
          distance: 16014,
          durationMin: 1201,
          price: 2116.63
        }
      ];

      nock('http://node.locomote.com')
        .get('/code-task/flight_search/QF')
        .query({ date: '2018-09-02', from: 'SYD', to: 'JFK' })
        .reply(200, melbourneFlightSearchData);

      nock('http://node.locomote.com')
        .get('/code-task/flight_search/QF')
        .query({ date: '2018-09-02', from: 'YQY', to: 'JFK' })
        .reply(404)

      // http://node.locomote.com/code-task/flight_search/SQ?date=2018-09-02&from=SYD&to=JFK
      // Not Found
      // var errorMessage = {
      //   'statusCode': 400,
      //   'error': 'invalid airline'
      // };

      nock('http://node.locomote.com')
        .get('/code-task/flight_search/SU')
        .query({ date: '2018-09-02', from: 'SYD', to: 'JFK' })
        .reply(400);

      nock('http://node.locomote.com')
        .get('/code-task/flight_search/SU')
        .query({ date: '2018-09-02', from: 'YQY', to: 'JFK' })
        .reply(404)

      nock('http://node.locomote.com')
        .get('/code-task/flight_search/MU')
        .query({ date: '2018-09-02', from: 'SYD', to: 'JFK' })
        .reply(400);

      nock('http://node.locomote.com')
        .get('/code-task/flight_search/MU')
        .query({ date: '2018-09-02', from: 'YQY', to: 'JFK' })
        .reply(404)

      nock('http://node.locomote.com')
        .get('/code-task/flight_search/EK')
        .query({ date: '2018-09-02', from: 'SYD', to: 'JFK' })
        .reply(400);

      nock('http://node.locomote.com')
        .get('/code-task/flight_search/EK')
        .query({ date: '2018-09-02', from: 'YQY', to: 'JFK' })
        .reply(404)

      nock('http://node.locomote.com')
        .get('/code-task/flight_search/KE')
        .query({ date: '2018-09-02', from: 'SYD', to: 'JFK' })
        .reply(400);

      nock('http://node.locomote.com')
        .get('/code-task/flight_search/KE?date=2018-09-02&from=YQY&to=JFK')
        // .query({ date: '2018-09-02', from: 'YQY', to: 'JFK' })
        .reply(404)

      nock('http://node.locomote.com')
        .get('/code-task/flight_search/SQ?date=2018-09-02&from=SYD&to=JFK')
        // .query({ date: '2018-09-02', from: 'SYD', to: 'JFK' })
        .reply(400);

      nock('http://node.locomote.com')
        .get('/code-task/flight_search/SQ?date=2018-09-02&from=YQY&to=JFK')
        // .query({ date: '2018-09-02', from: 'YQY', to: 'JFK' })
        .reply(404)
        // .reply(404, [errorMessage]);
    });

    let subject = new describedClass();
    const date = '2018-09-02';
    const from = 'Sydney';
    const to = 'New York';
    const params = { date: date, from: from, to: to };

    it('returns an Array of searched flights', function (done) {
      subject.search(params, function (error, data) {
        expect(data).toEqual(jasmine.any(Array));
        expect(data).not.toBeLessThan(0);

        done();
      });
    });

    it('each flight has properties', function (done) {
      subject.search(params, function (error, data) {
        data.forEach(function (searchResult) {
          expect(searchResult.key).toEqual(jasmine.any(String));
          expect(searchResult.airline).toEqual(jasmine.any(Object));
          expect(searchResult.airline.code).toEqual(jasmine.any(String));
          expect(searchResult.airline.name).toEqual(jasmine.any(String));

          expect(searchResult.flightNum).toEqual(jasmine.any(Number));

          expect(searchResult.start).toEqual(jasmine.any(Object));
          expect(searchResult.start.dateTime).toEqual(jasmine.any(String));
          expect(searchResult.start.airportCode).toEqual(jasmine.any(String));
          expect(searchResult.start.airportName).toEqual(jasmine.any(String));
          expect(searchResult.start.cityCode).toEqual(jasmine.any(String));
          expect(searchResult.start.cityName).toEqual(jasmine.any(String));
          expect(searchResult.start.countryCode).toEqual(jasmine.any(String));
          expect(searchResult.start.countryName).toEqual(jasmine.any(String));
          expect(searchResult.start.latitude).toEqual(jasmine.any(Number));
          expect(searchResult.start.longitude).toEqual(jasmine.any(Number));
          expect(searchResult.start.stateCode).toEqual(jasmine.any(String));
          expect(searchResult.start.timeZone).toEqual(jasmine.any(String));

          expect(searchResult.finish).toEqual(jasmine.any(Object));
          expect(searchResult.finish.dateTime).toEqual(jasmine.any(String));
          expect(searchResult.finish.airportCode).toEqual(jasmine.any(String));
          expect(searchResult.finish.airportName).toEqual(jasmine.any(String));
          expect(searchResult.finish.cityCode).toEqual(jasmine.any(String));
          expect(searchResult.finish.cityName).toEqual(jasmine.any(String));
          expect(searchResult.finish.countryCode).toEqual(jasmine.any(String));
          expect(searchResult.finish.countryName).toEqual(jasmine.any(String));
          expect(searchResult.finish.latitude).toEqual(jasmine.any(Number));
          expect(searchResult.finish.longitude).toEqual(jasmine.any(Number));
          expect(searchResult.finish.stateCode).toEqual(jasmine.any(String));
          expect(searchResult.finish.timeZone).toEqual(jasmine.any(String));

          expect(searchResult.plane).toEqual(jasmine.any(Object));
          expect(searchResult.plane.code).toEqual(jasmine.any(String));
          expect(searchResult.plane.shortName).toEqual(jasmine.any(String));
          expect(searchResult.plane.fullName).toEqual(jasmine.any(String));
          expect(searchResult.plane.manufacturer).toEqual(jasmine.any(String));
          expect(searchResult.plane.model).toEqual(jasmine.any(String));

          expect(searchResult.distance).toEqual(jasmine.any(Number));
          expect(searchResult.durationMin).toEqual(jasmine.any(Number));
          expect(searchResult.price).toEqual(jasmine.any(Number));
        });

        done();
      });
    });

    it('asyncSearchPreamble returns an Object of required search flight data', function (done) {
      subject.asyncSearchPreamble(params)
        .then(function (data) {
          expect(data).toEqual(jasmine.any(Object));
          done();
        });
    });

    it('asyncSearchPreamble returns expected mocked search flight data', function (done) {
      subject.asyncSearchPreamble(params)
        .then(function (data) {
          expect(data.airlines).toEqual([
            { code: "FB", name: "FooBar" },
            { code: "SU", name: "Aeroflot" },
            { code: "MU", name: "China Eastern" },
            { code: "EK", name: "Emirates" },
            { code: "KE", name: "Korean Air lines" },
            { code: "QF", name: "Qantas" },
            { code: "SQ", name: "Singapore Airlines" }
          ]);
          expect(data.fromAirports).toEqual(['SYD', 'YQY']);
          expect(data.toAirports).toEqual(['JFK']);
          expect(data.travelDate).toEqual('2018-09-02');

          done();
        });
    });

    it('find mock flight', function (done) {
      subject.search(params, function (error, data) {
        const searchResult = data.find(function (flight) {
          return flight.key === 'DDY5MDUgMTUzNTgxMDQwMDAwMA==';
        });

        expect(searchResult).toEqual({
          key: "DDY5MDUgMTUzNTgxMDQwMDAwMA==",
          airline: {
            code: "FB",
            name: "FooBar"
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
          price: 2798.42
        });

        done();
      });
    });
  });
});
