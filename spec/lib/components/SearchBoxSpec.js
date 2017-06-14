const nock = require('nock');

const SearchResult = require('../../../lib/components/SearchResult');
const NullSearchResult = require('../../../lib/components/NullSearchResult');

const describedClass = require('../../../lib/components/SearchBox');

describe('SearchBox component', function () {
  describe('default state', function () {
    const subject = new describedClass();

    it('has internal state', function (done) {
      expect(subject.state).toEqual(jasmine.any(Object));
      done();
    });

    it('has "from" state', function (done) {
      expect(subject.state.from).toEqual(jasmine.any(String));
      done();
    });

    it('has "to" state', function (done) {
      expect(subject.state.to).toEqual(jasmine.any(String));
      done();
    });

    it('has "travelDate" state', function (done) {
      expect(subject.state.travelDate).toEqual(jasmine.any(String));
      done();
    });

    it('has "results" array within state', function (done) {
      expect(subject.state.results).toEqual(jasmine.any(Array));
      done();
    });

    it('has internal reRenderCallback function', function (done) {
      expect(subject.reRenderCallback).toEqual(jasmine.any(Function));
      done();
    });

    it('has internal reRenderLocation variable', function (done) {
      expect(subject.reRenderLocation).toEqual(jasmine.any(Object));
      done();
    });
  });

  describe('functions without input and results', function () {
    const subject = new describedClass();

    it('setState', function (done) {
      spyOn(subject, 'reRenderCallback')
      subject.setState({});

      expect(subject.reRenderCallback).toHaveBeenCalled();
      expect(subject.reRenderCallback)
        .toHaveBeenCalledWith(subject, subject.reRenderLocation);
      done();
    });

    it('render', function (done) {
      expect(subject.render()).toEqual(jasmine.any(Object));
      done();
    });

    it('render outerHTML', function (done) {
      expect(subject.render().outerHTML).toEqual(
        '<div class="search-box">' +
          '<form id="search-form">' +
            '<label for="from">From location</label>' +
            '<input type="text" name="from" value="">' +
            '<label for="to">To location</label>' +
            '<input type="text" name="to" value="">' +
            '<label for="travel_date">Travel date</label>' +
            '<input type="text" name="travel_date" value="">' +
            '<input type="submit" value="Search">' +
          '</form>' +
        '</div>'
      );
      done();
    });
  });

  describe('functions with results', function () {
      // http://node.locomote.com/code-task/flight_search/QF?date=2018-09-02&from=SYD&to=MLB
      const sydneyToMelbourneFlightSearchData = [
        {
          key: "UUY5MDUgMTUzNTgxMDQwMDAwMA==",
          airline: {
            code: "QF",
            name: "Qantas"
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
            dateTime: "2018-09-02T09:23:00+10:00",
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
            dateTime: "2018-09-02T15:24:00-04:00",
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
            dateTime: "2018-09-02T22:56:00+10:00",
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
            dateTime: "2018-09-02T15:38:00+10:00",
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
            dateTime: "2018-09-02T21:39:00-04:00",
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
            dateTime: "2018-09-02T04:10:00+10:00",
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
            dateTime: "2018-09-02T10:11:00-04:00",
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
            dateTime: "2018-09-02T20:52:00+10:00",
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
            dateTime: "2018-09-02T15:38:00+10:00",
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
            dateTime: "2018-09-02T21:39:00-04:00",
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
            dateTime: "2018-09-02T07:18:00+10:00",
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
            dateTime: "2018-09-02T13:19:00-04:00",
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

    beforeEach(function () {
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

      // Valid Flights
      nock('http://node.locomote.com')
        .get('/code-task/flight_search/QF?date=2018-09-02&from=SYD&to=MLB')
        .reply(200, sydneyToMelbourneFlightSearchData);

      // Invalid Flights (or flights not found)
      nock('http://node.locomote.com')
        .get('/code-task/flight_search/FB?date=2018-09-02&from=SYD&to=MLB')
        .reply(400);

      nock('http://node.locomote.com')
        .get('/code-task/flight_search/SQ?date=2018-09-02&from=SYD&to=MLB')
        .reply(400);

      nock('http://node.locomote.com')
        .get('/code-task/flight_search/SU?date=2018-09-02&from=SYD&to=MLB')
        .reply(400);

      nock('http://node.locomote.com')
        .get('/code-task/flight_search/MU?date=2018-09-02&from=SYD&to=MLB')
        .reply(400);

      nock('http://node.locomote.com')
        .get('/code-task/flight_search/EK?date=2018-09-02&from=SYD&to=MLB')
        .reply(400);

      nock('http://node.locomote.com')
        .get('/code-task/flight_search/KE?date=2018-09-02&from=SYD&to=MLB')
        .reply(400);

      nock('http://node.locomote.com')
        .get('/code-task/flight_search/SQ?date=2018-09-02&from=SYD&to=MLB')
        .reply(400);
    });

    const subject = new describedClass({
      from: "SYD", to: "MLB", travelDate: "2018-09-02"
    });

    it('render outerHTML', function (done) {
      expect(subject.render().outerHTML).toEqual(
        '<div class="search-box">' +
          '<form id="search-form">' +
            '<label for="from">From location</label>' +
            '<input type="text" name="from" value="SYD">' +
            '<label for="to">To location</label>' +
            '<input type="text" name="to" value="MLB">' +
            '<label for="travel_date">Travel date</label>' +
            '<input type="text" name="travel_date" value="2018-09-02">' +
            '<input type="submit" value="Search">' +
          '</form>' +
        '</div>'
      );
      done();
    });

    it('render outerHTML after search', function (done) {
      const _subject = new describedClass({
        from: "SYD", to: "MLB", travelDate: "2018-09-02"
      });

      _subject.reRenderCallback = function expectedResults(component, _) {
        expect(component.render().outerHTML).toEqual(
          '<div class="search-box">' +
            '<form id="search-form">' +
              '<label for="from">From location</label>' +
              '<input type="text" name="from" value="SYD">' +
              '<label for="to">To location</label>' +
              '<input type="text" name="to" value="MLB">' +
              '<label for="travel_date">Travel date</label>' +
              '<input type="text" name="travel_date" value="2018-09-02">' +
              '<input type="submit" value="Search">' +
            '</form>' +
            '<article id="UUY5MDUgMTUzNTgxMDQwMDAwMA==">' +
              '<p>flightNum: 905</p>' +
              '<p>distance: 16014</p>' +
              '<p>durationMin: 1201</p>' +
              '<p>price: 2798.42</p>' +
            '</article>' +
            '<article id="UUY0MTkgMTUzNTgxMDQwMDAwMA==">' +
              '<p>flightNum: 419</p>' +
              '<p>distance: 16014</p>' +
              '<p>durationMin: 1201</p>' +
              '<p>price: 2116.63</p>' +
            '</article>' +
            '<article id="UUY2NSAxNTM1ODEwNDAwMDAw">' +
              '<p>flightNum: 65</p>' +
              '<p>distance: 16014</p>' +
              '<p>durationMin: 1201</p>' +
              '<p>price: 2541.81</p>' +
            '</article>' +
            '<article id="UUYxMjcgMTUzNTgxMDQwMDAwMA==">' +
              '<p>flightNum: 127</p>' +
              '<p>distance: 16014</p>' +
              '<p>durationMin: 1201</p>' +
              '<p>price: 1938.55</p>' +
            '</article>' +
            '<article id="UUYzMDggMTUzNTgxMDQwMDAwMA==">' +
              '<p>flightNum: 308</p>' +
              '<p>distance: 16014</p>' +
              '<p>durationMin: 1201</p>' +
              '<p>price: 2942.3</p>' +
            '</article>' +
            '<article id="UUY0MzAgMTUzNTgxMDQwMDAwMA==">' +
              '<p>flightNum: 430</p>' +
              '<p>distance: 16014</p>' +
              '<p>durationMin: 1201</p>' +
              '<p>price: 2019.05</p>' +
            '</article>' +
            '<article id="UUY1NDQgMTUzNTgxMDQwMDAwMA==">' +
              '<p>flightNum: 544</p>' +
              '<p>distance: 16014</p>' +
              '<p>durationMin: 1201</p>' +
              '<p>price: 2330.31</p>' +
            '</article>' +
            '<article id="UUYzMzAgMTUzNTgxMDQwMDAwMA==">' +
              '<p>flightNum: 330</p>' +
              '<p>distance: 16014</p>' +
              '<p>durationMin: 1201</p>' +
              '<p>price: 2918.99</p>' +
            '</article>' +
            '<article id="UUY5NCAxNTM1ODEwNDAwMDAw">' +
              '<p>flightNum: 94</p>' +
              '<p>distance: 16014</p>' +
              '<p>durationMin: 1201</p>' +
              '<p>price: 2225.91</p>' +
            '</article>' +
          '</div>'
        );
      }

      _subject._searchFromServer("SYD", "MLB", "2018-09-02")
      done();
    });

    it('_getResults (before AJAX request)', function (done) {
      const _subject = new describedClass();
      const results = _subject._getResults();

      expect(results).toEqual([]);
      done();
    });

    it('_getResults (after AJAX request with no params)', function (done) {
      const _subject = new describedClass();

      _subject.reRenderCallback = function expectedResults(component, _) {
        const results = component._getResults();
        expect(results).toEqual([]);
      };

      _subject._searchFromServer();
      const results = _subject._getResults();

      expect(results).toEqual([]);
      done();
    });

    it('_getResults (after AJAX request with with params, but no results)', function (done) {
      ["FB", "SU", "MU", "EK", "KE", "QF", "SQ"].forEach(function (airportCode) {
        nock('http://node.locomote.com')
          .get('/code-task/flight_search/SQ?date=2018-09-02&from=MLB&to=SYD')
          .reply(400);
      });

      const _subject = new describedClass();

      _subject.reRenderCallback = function expectedResults(component, _) {
        const results = component._getResults();

        results.forEach(function(result) {
          expect(result).toEqual([jasmine.any(NullSearchResult)]);
        });
      };

      _subject._searchFromServer("MLB", "SYB", "2018-09-02");
      done();
    });

    it('_getResults (after AJAX request with params)', function (done) {
      const _subject = new describedClass({
        from: "SYD", to: "MLB", travelDate: "2018-09-02"
      });

      _subject.reRenderCallback = function expectedResults(component, _) {
        const results = component._getResults();

        results.forEach(function(result) {
          expect(result).toEqual(jasmine.any(SearchResult));
        });
      };
      _subject._searchFromServer("SYD", "MLB", "2018-09-02")

      done();
    });

    it('_searchFromServer returns expected flights data', function (done) {
      const _subject = new describedClass({
        from: "SYD", to: "MLB", travelDate: "2018-09-02"
      });

      _subject._searchFromServer("SYD", "MLB", "2018-09-02", function (error, data) {
        expect(data).toEqual(sydneyToMelbourneFlightSearchData);
      });
      done();
    });
  });
});
