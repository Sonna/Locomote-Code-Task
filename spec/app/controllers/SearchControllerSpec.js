const nock = require('nock');
const request = require('request');

const describedClass = require('../../../app/controllers/SearchController');

describe('SearchController app controller', function () {
  describe('searchCreate', function () {
    const subject = describedClass;

    const airlinesData = [
      { code: "FB", name: "FooBar" },
      { code: "SU", name: "Aeroflot" },
      { code: "MU", name: "China Eastern" },
      { code: "EK", name: "Emirates" },
      { code: "KE", name: "Korean Air lines" },
      { code: "QF", name: "Qantas" },
      { code: "SQ", name: "Singapore Airlines" }
    ];

    // http://node.locomote.com/code-task/flight_search/QF?date=2020-10-22&from=SYD&to=MLB
    const sydneyToMelbourneFlightSearchData = [
      {
        key: "UUY5MDUgMTUzNTgxMDQwMDAwMA==",
        airline: {
          code: "QF",
          name: "Qantas"
        },
        flightNum: 905,
        start: {
          dateTime: "2020-10-22T16:42:00+10:00",
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
          dateTime: "2020-10-22T22:43:00-04:00",
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
      },
      {
        key: "UUY0MTkgMTUzNTgxMDQwMDAwMA==",
        airline: {
          code: "QF",
          name: "Qantas"
        },
        flightNum: 419,
        start: {
          dateTime: "2020-10-22T23:58:00+10:00",
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
      },
      {
        key: "UUY2NSAxNTM1ODEwNDAwMDAw",
        airline: {
          code: "QF",
          name: "Qantas"
        },
        flightNum: 65,
        start: {
          dateTime: "2020-10-22T09:23:00+10:00",
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
          dateTime: "2020-10-22T15:24:00-04:00",
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
        plane: {
          code: "380",
          shortName: "Airbus A380",
          fullName: "Airbus Industrie A380",
          manufacturer: "Airbus",
          model: "A380"
        },
        distance: 16014,
        durationMin: 1201,
        price: 2541.81
      },
      {
        key: "UUYxMjcgMTUzNTgxMDQwMDAwMA==",
        airline: {
          code: "QF",
          name: "Qantas"
        },
        flightNum: 127,
        start: {
          dateTime: "2020-10-22T22:56:00+10:00",
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
          dateTime: "2018-09-03T04:57:00-04:00",
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
        plane: {
          code: "333",
          shortName: "Airbus A330-300",
          fullName: "Airbus Industrie A330-300",
          manufacturer: "Airbus",
          model: "A330-300"
        },
        distance: 16014,
        durationMin: 1201,
        price: 1938.55
      },
      {
        key: "UUYzMDggMTUzNTgxMDQwMDAwMA==",
        airline: {
          code: "QF",
          name: "Qantas"
        },
        flightNum: 308,
        start: {
          dateTime: "2020-10-22T15:38:00+10:00",
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
          dateTime: "2020-10-22T21:39:00-04:00",
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
        plane: {
          code: "74H",
          shortName: "Boeing 747-8",
          fullName: "Boeing 747-8",
          manufacturer: "Boeing",
          model: "747-8 Intercontinental"
        },
        distance: 16014,
        durationMin: 1201,
        price: 2942.3
      },
      {
        key: "UUY0MzAgMTUzNTgxMDQwMDAwMA==",
        airline: {
          code: "QF",
          name: "Qantas"
        },
        flightNum: 430,
        start: {
          dateTime: "2020-10-22T04:10:00+10:00",
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
          dateTime: "2020-10-22T10:11:00-04:00",
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
        plane: {
          code: "KAN",
          shortName: "Skippy",
          fullName: "Kangaroo",
          manufacturer: "Australia",
          model: "Red"
        },
        distance: 16014,
        durationMin: 1201,
        price: 2019.05
      },
      {
        key: "UUY1NDQgMTUzNTgxMDQwMDAwMA==",
        airline: {
          code: "QF",
          name: "Qantas"
        },
        flightNum: 544,
        start: {
          dateTime: "2020-10-22T20:52:00+10:00",
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
          dateTime: "2018-09-03T02:53:00-04:00",
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
        plane: {
          code: "KAN",
          shortName: "Skippy",
          fullName: "Kangaroo",
          manufacturer: "Australia",
          model: "Red"
        },
        distance: 16014,
        durationMin: 1201,
        price: 2330.31
      },
      {
        key: "UUYzMzAgMTUzNTgxMDQwMDAwMA==",
        airline: {
          code: "QF",
          name: "Qantas"
        },
        flightNum: 330,
        start: {
          dateTime: "2020-10-22T15:38:00+10:00",
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
          dateTime: "2020-10-22T21:39:00-04:00",
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
        plane: {
          code: "74H",
          shortName: "Boeing 747-8",
          fullName: "Boeing 747-8",
          manufacturer: "Boeing",
          model: "747-8 Intercontinental"
        },
        distance: 16014,
        durationMin: 1201,
        price: 2918.99
      },
      {
        key: "UUY5NCAxNTM1ODEwNDAwMDAw",
        airline: {
          code: "QF",
          name: "Qantas"
        },
        flightNum: 94,
        start: {
          dateTime: "2020-10-22T07:18:00+10:00",
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
          dateTime: "2020-10-22T13:19:00-04:00",
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
        plane: {
          code: "74H",
          shortName: "Boeing 747-8",
          fullName: "Boeing 747-8",
          manufacturer: "Boeing",
          model: "747-8 Intercontinental"
        },
        distance: 16014,
        durationMin: 1201,
        price: 2225.91
      }
    ];

    // http://node.locomote.com/code-task/airports?q=Melbourne
    const fooMelbourneAirportData = [
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

    // http://node.locomote.com/code-task/airports?q=Sydney
    const fooSydneyAirportData = [
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

    beforeEach(function () {
      // Mock external request response
      nock('http://node.locomote.com')
        .get('/code-task/airlines')
        .reply(200, airlinesData);

      nock('http://node.locomote.com')
        .get('/code-task/airports?q=FooMelbourne')
        .reply(200, fooMelbourneAirportData);

      nock('http://node.locomote.com')
        .get('/code-task/airports?q=FooSydney')
        .reply(200, fooSydneyAirportData);

      // Invalid Flights (or flights not found)
      ["2020-10-20", "2020-10-21", "2020-10-22", "2020-10-23", "2020-10-25"].forEach(function (travelDate) {
        ["FB", "SU", "MU", "EK", "KE", "QF", "SQ"].forEach(function (airportCode) {
          nock('http://node.locomote.com')
            .get('/code-task/flight_search/' + airportCode + '?date=' + travelDate + '&from=YGY&to=MEL')
            .reply(400);
          nock('http://node.locomote.com')
            .get('/code-task/flight_search/' + airportCode + '?date=' + travelDate + '&from=YGY&to=MLB')
            .reply(400);
          nock('http://node.locomote.com')
            .get('/code-task/flight_search/' + airportCode + '?date=' + travelDate + '&from=SYD&to=MEL')
            .reply(400);

          if ("2020-10-22" == travelDate && "QF" == airportCode) { return; }
          nock('http://node.locomote.com')
            .get('/code-task/flight_search/' + airportCode + '?date=' + travelDate + '&from=SYD&to=MLB')
            .reply(400);
        });
      });

      // Valid Flights
      nock('http://node.locomote.com')
        .get('/code-task/flight_search/QF?date=2020-10-22&from=SYD&to=MLB')
        .reply(200, sydneyToMelbourneFlightSearchData);
    });

    it('returns an Array of flight results', function (done) {
      let request = {
        url: 'localhost:3000/search?from=FooSydney&to=FooMelbourne&date=2020-10-22'
      };
      let response = {
        content: '',
        contentType: '',
        encoding: '',
        statusCode: 0,
        writeHead: function(statusCode, contentType) {
          this.statusCode = statusCode;
          this.contentType = contentType;
        },
        end: function(content, encoding) {
          this.content = content;
          this.encoding = encoding;

          expect(response.statusCode).toEqual(200);
          expect(response.contentType).toEqual({
            'Content-Type': 'application/json'
          });
          expect(JSON.parse(response.content)).toEqual(
            sydneyToMelbourneFlightSearchData
          );
          expect(response.encoding).toEqual('utf-8');

          done();
        }
      };

      subject.searchCreate(request, response);
    });
  });
});
