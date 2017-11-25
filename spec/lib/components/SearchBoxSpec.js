const nock = require('nock');

const SearchResult = require('../../../lib/components/SearchResult');
const Tabs = require('../../../lib/components/Tabs');
const NullSearchResult = require('../../../lib/components/NullSearchResult');
const NullComponent = require('../../../lib/components/NullComponent');

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

    it('has "results" object within state', function (done) {
      expect(subject.state.results).toEqual(jasmine.any(Object));
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
          '<div id="loader" style="display: none;"></div>' +
          '<form id="search-form">' +
            '<ul class="form-errors"></ul>' +
            '<div class="input-group">' +
              '<label for="from">From location<abbr title="required">*</abbr></label>' +
              '<input type="text" name="from" value="">' +
            '</div>' +
            '<div class="input-group">' +
              '<label for="to">To location<abbr title="required">*</abbr></label>' +
              '<input type="text" name="to" value="">' +
            '</div>' +
            '<div class="input-group">' +
              '<label for="travel_date">Travel date<abbr title="required">*</abbr></label>' +
              '<input type="text" name="travel_date" value="">' +
            '</div>' +
            '<div class="input-group">' +
              '<input type="submit" name="submit" value="Search">' +
            '</div>' +
          '</form>' +
          '<section class="search-results">' +
            '<div></div>' +
          '</section>' +
        '</div>'
      );
      done();
    });
  });

  describe('functions with results', function () {
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
    // var originalTimeout;

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

      nock('http://node.locomote.com')
        .get('/code-task/airports?q=FooMelbourne')
        .reply(200, fooMelbourneAirportData);

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

      // originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      // jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
    });

    // afterEach(function() {
    //   jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    // });

    const subject = new describedClass({
      from: "FooSydney", to: "FooMelbourne", travelDate: "2020-10-22"
    });

    it('render outerHTML', function (done) {
      expect(subject.render().outerHTML).toEqual(
        '<div class="search-box">' +
          '<div id="loader" style="display: none;"></div>' +
          '<form id="search-form">' +
            '<ul class="form-errors"></ul>' +
            '<div class="input-group">' +
              '<label for="from">From location<abbr title="required">*</abbr></label>' +
              '<input type="text" name="from" value="FooSydney">' +
            '</div>' +
            '<div class="input-group">' +
              '<label for="to">To location<abbr title="required">*</abbr></label>' +
              '<input type="text" name="to" value="FooMelbourne">' +
            '</div>' +
            '<div class="input-group">' +
              '<label for="travel_date">Travel date<abbr title="required">*</abbr></label>' +
              '<input type="text" name="travel_date" value="2020-10-22">' +
            '</div>' +
            '<div class="input-group">' +
              '<input type="submit" name="submit" value="Search">' +
            '</div>' +
          '</form>' +
          '<section class="search-results">' +
            '<div></div>' +
          '</section>' +
        '</div>'
      );
      done();
    });

    it('render outerHTML after search', function (done) {
      const _subject = new describedClass({
        from: "FooSydney", to: "FooMelbourne", travelDate: "2020-10-22"
      });

      _subject._searchFromServer("FooSydney", "FooMelbourne", "2020-10-22",
        function(_error, searchbox) {
          // expect(searchbox.render().outerHTML).toEqual(
          expect([
            '<div class="search-box">' +
              '<div id="loader" style="display: none;"></div>' +
              '<form id="search-form">' +
                '<ul class="form-errors"></ul>' +
                '<div class="input-group">' +
                  '<label for="from">From location<abbr title="required">*</abbr></label>' +
                  '<input type="text" name="from" value="FooSydney">' +
                '</div>' +
                '<div class="input-group">' +
                  '<label for="to">To location<abbr title="required">*</abbr></label>' +
                  '<input type="text" name="to" value="FooMelbourne">' +
                '</div>' +
                '<div class="input-group">' +
                  '<label for="travel_date">Travel date<abbr title="required">*</abbr></label>' +
                  '<input type="text" name="travel_date" value="2020-10-22">' +
                '</div>' +
                '<div class="input-group">' +
                  '<input type="submit" name="submit" value="Search">' +
                '</div>' +
              '</form>' +
              '<section class="search-results">' +
                '<article id="null-search-result">' +
                  '<h2 class="">No flights found</h2>' +
                '</article>' +
              '</section>' +
            '</div>',
            // Or when results have loaded
            '<div class="search-box">' +
              '<div id="loader" style="display: none;"></div>' +
              '<form id="search-form">' +
                '<div class="input-group">' +
                  '<label for="from">From location<abbr title="required">*</abbr></label>' +
                  '<input type="text" name="from" value="FooSydney">' +
                '</div>' +
                '<div class="input-group">' +
                  '<label for="to">To location<abbr title="required">*</abbr></label>' +
                  '<input type="text" name="to" value="FooMelbourne">' +
                '</div>' +
                '<div class="input-group">' +
                  '<label for="travel_date">Travel date<abbr title="required">*</abbr></label>' +
                  '<input type="text" name="travel_date" value="2020-10-22">' +
                '</div>' +
                '<div class="input-group">' +
                  '<input type="submit" value="Search">' +
                '</div>' +
              '</form>' +
              '<section class="search-results">' +
                '<div>' +
                  '<div class="tab">' +
                    '<button class="tablinks" data-target-id="2020-10-22">2020-10-22</button>' +
                  '</div>' +
                  '<div id="2020-10-22" class="tabcontent animate-bottom">' +
                    '<article id="UUYxMjcgMTUzNTgxMDQwMDAwMA==" class="flight search-result">' +
                      '<section class="start">' +
                        '<span class="airport">' +
                          '<abbr title="Kingsford Smith">SYD</abbr>' +
                        '</span>' +
                        '<time class="datetime" datetime="2020-10-22T22:56:00+10:00">' +
                        '<span class="time">12:56<span class="period">AM</span></span>' +
                        '<span class="date">Thu, 22 Oct</span>' +
                        '</time>' +
                      '</section>' +
                      '<section class="finish">' +
                        '<span class="airport">' +
                          '<abbr title="Melbourne International Arpt">MLB</abbr>' +
                        '</span>' +
                        '<time class="datetime" datetime="2018-09-03T04:57:00-04:00">' +
                          '<span class="time">08:57<span class="period">AM</span></span>' +
                          '<span class="date">Mon, 03 Sep</span>' +
                        '</time>' +
                      '</section>' +
                      '<section class="flight-details">' +
                        '<span class="flight-num">' +
                          '<abbr title="Qantas">QF</abbr>' +
                          '<span>127</span>' +
                        '</span>' +
                        '<span class="duration-minimum">20<abbr title="hours">h</abbr> : 1<abbr title="minutes">min</abbr></span>' +
                        '<span class="divider"> / </span>' +
                        '<span class="distance">16<abbr title="kilometers">km</abbr> 14<abbr title="meters">m</abbr></span>' +
                      '</section>' +
                      '<section class="fare">' +
                        '<span class="currency-symbol">$</span>' +
                        '<span class="price">1938.55</span>' +
                      '</section>' +
                    '</article>' +
                    '<article id="UUY0MzAgMTUzNTgxMDQwMDAwMA==" class="flight search-result">' +
                      '<section class="start">' +
                        '<span class="airport">' +
                          '<abbr title="Kingsford Smith">SYD</abbr>' +
                        '</span>' +
                        '<time class="datetime" datetime="2020-10-22T04:10:00+10:00">' +
                        '<span class="time">18:10<span class="period">AM</span></span>' +
                        '<span class="date">Wed, 21 Oct</span>' +
                        '</time>' +
                      '</section>' +
                      '<section class="finish">' +
                        '<span class="airport">' +
                          '<abbr title="Melbourne International Arpt">MLB</abbr>' +
                        '</span>' +
                        '<time class="datetime" datetime="2020-10-22T10:11:00-04:00">' +
                          '<span class="time">14:11<span class="period">AM</span></span>' +
                          '<span class="date">Thu, 22 Oct</span>' +
                        '</time>' +
                      '</section>' +
                      '<section class="flight-details">' +
                        '<span class="flight-num">' +
                          '<abbr title="Qantas">QF</abbr>' +
                          '<span>430</span>' +
                        '</span>' +
                        '<span class="duration-minimum">20<abbr title="hours">h</abbr> : 1<abbr title="minutes">min</abbr></span>' +
                        '<span class="divider"> / </span>' +
                        '<span class="distance">16<abbr title="kilometers">km</abbr> 14<abbr title="meters">m</abbr></span>' +
                      '</section>' +
                      '<section class="fare">' +
                        '<span class="currency-symbol">$</span>' +
                        '<span class="price">2019.05</span>' +
                      '</section>' +
                    '</article>' +
                    '<article id="UUY0MTkgMTUzNTgxMDQwMDAwMA==" class="flight search-result">' +
                      '<section class="start">' +
                        '<span class="airport">' +
                          '<abbr title="Kingsford Smith">SYD</abbr>' +
                        '</span>' +
                        '<time class="datetime" datetime="2020-10-22T23:58:00+10:00">' +
                        '<span class="time">13:58<span class="period">AM</span></span>' +
                        '<span class="date">Thu, 22 Oct</span>' +
                        '</time>' +
                      '</section>' +
                      '<section class="finish">' +
                        '<span class="airport">' +
                          '<abbr title="Melbourne International Arpt">MLB</abbr>' +
                        '</span>' +
                        '<time class="datetime" datetime="2018-09-03T05:59:00-04:00">' +
                          '<span class="time">09:59<span class="period">AM</span></span>' +
                          '<span class="date">Mon, 03 Sep</span>' +
                        '</time>' +
                      '</section>' +
                      '<section class="flight-details">' +
                        '<span class="flight-num">' +
                          '<abbr title="Qantas">QF</abbr>' +
                          '<span>419</span>' +
                        '</span>' +
                        '<span class="duration-minimum">20<abbr title="hours">h</abbr> : 1<abbr title="minutes">min</abbr></span>' +
                        '<span class="divider"> / </span>' +
                        '<span class="distance">16<abbr title="kilometers">km</abbr> 14<abbr title="meters">m</abbr></span>' +
                      '</section>' +
                      '<section class="fare">' +
                        '<span class="currency-symbol">$</span>' +
                        '<span class="price">2116.63</span>' +
                      '</section>' +
                    '</article>' +
                    '<article id="UUY5NCAxNTM1ODEwNDAwMDAw" class="flight search-result">' +
                      '<section class="start">' +
                        '<span class="airport">' +
                          '<abbr title="Kingsford Smith">SYD</abbr>' +
                        '</span>' +
                        '<time class="datetime" datetime="2020-10-22T07:18:00+10:00">' +
                        '<span class="time">21:18<span class="period">AM</span></span>' +
                        '<span class="date">Wed, 21 Oct</span>' +
                        '</time>' +
                      '</section>' +
                      '<section class="finish">' +
                        '<span class="airport">' +
                          '<abbr title="Melbourne International Arpt">MLB</abbr>' +
                        '</span>' +
                        '<time class="datetime" datetime="2020-10-22T13:19:00-04:00">' +
                          '<span class="time">17:19<span class="period">AM</span></span>' +
                          '<span class="date">Thu, 22 Oct</span>' +
                        '</time>' +
                      '</section>' +
                      '<section class="flight-details">' +
                        '<span class="flight-num">' +
                          '<abbr title="Qantas">QF</abbr>' +
                          '<span>94</span>' +
                        '</span>' +
                        '<span class="duration-minimum">20<abbr title="hours">h</abbr> : 1<abbr title="minutes">min</abbr></span>' +
                        '<span class="divider"> / </span>' +
                        '<span class="distance">16<abbr title="kilometers">km</abbr> 14<abbr title="meters">m</abbr></span>' +
                      '</section>' +
                      '<section class="fare">' +
                        '<span class="currency-symbol">$</span>' +
                        '<span class="price">2225.91</span>' +
                      '</section>' +
                    '</article>' +
                    '<article id="UUY1NDQgMTUzNTgxMDQwMDAwMA==" class="flight search-result">' +
                      '<section class="start">' +
                        '<span class="airport">' +
                          '<abbr title="Kingsford Smith">SYD</abbr>' +
                        '</span>' +
                        '<time class="datetime" datetime="2020-10-22T20:52:00+10:00">' +
                        '<span class="time">10:52<span class="period">AM</span></span>' +
                        '<span class="date">Thu, 22 Oct</span>' +
                        '</time>' +
                      '</section>' +
                      '<section class="finish">' +
                        '<span class="airport">' +
                          '<abbr title="Melbourne International Arpt">MLB</abbr>' +
                        '</span>' +
                        '<time class="datetime" datetime="2018-09-03T02:53:00-04:00">' +
                          '<span class="time">06:53<span class="period">AM</span></span>' +
                          '<span class="date">Mon, 03 Sep</span>' +
                        '</time>' +
                      '</section>' +
                      '<section class="flight-details">' +
                        '<span class="flight-num">' +
                          '<abbr title="Qantas">QF</abbr>' +
                          '<span>544</span>' +
                        '</span>' +
                        '<span class="duration-minimum">20<abbr title="hours">h</abbr> : 1<abbr title="minutes">min</abbr></span>' +
                        '<span class="divider"> / </span>' +
                        '<span class="distance">16<abbr title="kilometers">km</abbr> 14<abbr title="meters">m</abbr></span>' +
                      '</section>' +
                      '<section class="fare">' +
                        '<span class="currency-symbol">$</span>' +
                        '<span class="price">2330.31</span>' +
                      '</section>' +
                    '</article>' +
                    '<article id="UUY2NSAxNTM1ODEwNDAwMDAw" class="flight search-result">' +
                      '<section class="start">' +
                        '<span class="airport">' +
                          '<abbr title="Kingsford Smith">SYD</abbr>' +
                        '</span>' +
                        '<time class="datetime" datetime="2020-10-22T09:23:00+10:00">' +
                        '<span class="time">23:23<span class="period">AM</span></span>' +
                        '<span class="date">Wed, 21 Oct</span>' +
                        '</time>' +
                      '</section>' +
                      '<section class="finish">' +
                        '<span class="airport">' +
                          '<abbr title="Melbourne International Arpt">MLB</abbr>' +
                        '</span>' +
                        '<time class="datetime" datetime="2020-10-22T15:24:00-04:00">' +
                          '<span class="time">19:24<span class="period">AM</span></span>' +
                          '<span class="date">Thu, 22 Oct</span>' +
                        '</time>' +
                      '</section>' +
                      '<section class="flight-details">' +
                        '<span class="flight-num">' +
                          '<abbr title="Qantas">QF</abbr>' +
                          '<span>65</span>' +
                        '</span>' +
                        '<span class="duration-minimum">20<abbr title="hours">h</abbr> : 1<abbr title="minutes">min</abbr></span>' +
                        '<span class="divider"> / </span>' +
                        '<span class="distance">16<abbr title="kilometers">km</abbr> 14<abbr title="meters">m</abbr></span>' +
                      '</section>' +
                      '<section class="fare">' +
                        '<span class="currency-symbol">$</span>' +
                        '<span class="price">2541.81</span>' +
                      '</section>' +
                    '</article>' +
                    '<article id="UUY5MDUgMTUzNTgxMDQwMDAwMA==" class="flight search-result">' +
                      '<section class="start">' +
                        '<span class="airport">' +
                            '<abbr title="Kingsford Smith">SYD</abbr>' +
                        '</span>' +
                        '<time class="datetime" datetime="2020-10-22T16:42:00+10:00">' +
                        '<span class="time">06:42<span class="period">AM</span></span>' +
                        '<span class="date">Thu, 22 Oct</span>' +
                        '</time>' +
                      '</section>' +
                      '<section class="finish">' +
                        '<span class="airport">' +
                          '<abbr title="Melbourne International Arpt">MLB</abbr>' +
                        '</span>' +
                        '<time class="datetime" datetime="2020-10-22T22:43:00-04:00">' +
                          '<span class="time">02:43<span class="period">AM</span></span>' +
                          '<span class="date">Fri, 23 Oct</span>' +
                        '</time>' +
                      '</section>' +
                      '<section class="flight-details">' +
                        '<span class="flight-num">' +
                          '<abbr title="Qantas">QF</abbr>' +
                          '<span>905</span>' +
                        '</span>' +
                        '<span class="duration-minimum">20<abbr title="hours">h</abbr> : 1<abbr title="minutes">min</abbr></span>' +
                        '<span class="divider"> / </span>' +
                        '<span class="distance">16<abbr title="kilometers">km</abbr> 14<abbr title="meters">m</abbr></span>' +
                      '</section>' +
                      '<section class="fare">' +
                        '<span class="currency-symbol">$</span>' +
                        '<span class="price">2798.42</span>' +
                      '</section>' +
                    '</article>' +
                    '<article id="UUYzMzAgMTUzNTgxMDQwMDAwMA==" class="flight search-result">' +
                      '<section class="start">' +
                        '<span class="airport">' +
                          '<abbr title="Kingsford Smith">SYD</abbr>' +
                        '</span>' +
                        '<time class="datetime" datetime="2020-10-22T15:38:00+10:00">' +
                        '<span class="time">05:38<span class="period">AM</span></span>' +
                        '<span class="date">Thu, 22 Oct</span>' +
                        '</time>' +
                      '</section>' +
                      '<section class="finish">' +
                        '<span class="airport">' +
                          '<abbr title="Melbourne International Arpt">MLB</abbr>' +
                        '</span>' +
                        '<time class="datetime" datetime="2020-10-22T21:39:00-04:00">' +
                          '<span class="time">01:39<span class="period">AM</span></span>' +
                          '<span class="date">Fri, 23 Oct</span>' +
                        '</time>' +
                      '</section>' +
                      '<section class="flight-details">' +
                        '<span class="flight-num">' +
                          '<abbr title="Qantas">QF</abbr>' +
                          '<span>330</span>' +
                        '</span>' +
                        '<span class="duration-minimum">20<abbr title="hours">h</abbr> : 1<abbr title="minutes">min</abbr></span>' +
                        '<span class="divider"> / </span>' +
                        '<span class="distance">16<abbr title="kilometers">km</abbr> 14<abbr title="meters">m</abbr></span>' +
                      '</section>' +
                      '<section class="fare">' +
                        '<span class="currency-symbol">$</span>' +
                        '<span class="price">2918.99</span>' +
                      '</section>' +
                    '</article>' +
                    '<article id="UUYzMDggMTUzNTgxMDQwMDAwMA==" class="flight search-result">' +
                      '<section class="start">' +
                        '<span class="airport">' +
                          '<abbr title="Kingsford Smith">SYD</abbr>' +
                        '</span>' +
                        '<time class="datetime" datetime="2020-10-22T15:38:00+10:00">' +
                        '<span class="time">05:38<span class="period">AM</span></span>' +
                        '<span class="date">Thu, 22 Oct</span>' +
                        '</time>' +
                      '</section>' +
                      '<section class="finish">' +
                        '<span class="airport">' +
                          '<abbr title="Melbourne International Arpt">MLB</abbr>' +
                        '</span>' +
                        '<time class="datetime" datetime="2020-10-22T21:39:00-04:00">' +
                          '<span class="time">01:39<span class="period">AM</span></span>' +
                          '<span class="date">Fri, 23 Oct</span>' +
                        '</time>' +
                      '</section>' +
                      '<section class="flight-details">' +
                        '<span class="flight-num">' +
                          '<abbr title="Qantas">QF</abbr>' +
                          '<span>308</span>' +
                        '</span>' +
                        '<span class="duration-minimum">20<abbr title="hours">h</abbr> : 1<abbr title="minutes">min</abbr></span>' +
                        '<span class="divider"> / </span>' +
                        '<span class="distance">16<abbr title="kilometers">km</abbr> 14<abbr title="meters">m</abbr></span>' +
                      '</section>' +
                      '<section class="fare">' +
                        '<span class="currency-symbol">$</span>' +
                        '<span class="price">2942.30</span>' +
                      '</section>' +
                    '</article>' +
                  '</div>' +
                '</div>' +
              '</section>' +
            '</div>'
        ]).toContain(searchbox.render().outerHTML);

        done();
      });
    });

    it('_buildSearchResults (before AJAX request)', function (done) {
      const _subject = new describedClass();
      const results = _subject._buildSearchResults();

      expect(results).toEqual(jasmine.any(NullComponent));
      done();
    });

    it('_buildSearchResults (after AJAX request with no params)', function (done) {
      const _subject = new describedClass();

      _subject.reRenderCallback = function expectedResults(component, _) {
        const results = component._buildSearchResults();
        expect([
          jasmine.any(NullSearchResult),
          jasmine.any(NullComponent)
        ]).toContain(results);
      };

      // _subject._searchFromServer('', '', '', function(_error, searchbox) {
        // var results = searchbox._buildSearchResults();
        // expect(results).toEqual(jasmine.any(NullSearchResult));
        done();
      // });
    });

    it('_buildSearchResults (after AJAX request with with params, but no results)', function (done) {
      const _subject = new describedClass();

      _subject.reRenderCallback = function expectedResults(component, _) {
         const results = component._buildSearchResults();
        expect([
          jasmine.any(NullComponent),
          jasmine.any(NullSearchResult)
        ]).toContain(results);
      };

      // _subject._searchFromServer("Foo", "Bar", "2020-10-23",
      //   function(_error, _searchbox) {
          done();
        // });
    });

    it('_buildSearchResults (after AJAX request with params)', function (done) {
      const _subject = new describedClass({
        from: "FooSydney", to: "FooMelbourne", travelDate: "2020-10-22"
      });

      _subject.reRenderCallback = function expectedResults(component, _) {
        const results = component._buildSearchResults();
        expect([
          jasmine.any(NullComponent),
          jasmine.any(NullSearchResult),
          jasmine.any(Tabs)
        ]).toContain(results);

        if (results instanceof Tabs) {
          const content = results.props.content;
          content[Object.keys(content)[0]].forEach(function(result) {
            expect(result).toEqual(jasmine.any(SearchResult));
          });
        }
      };

      // _subject._searchFromServer("FooSydney", "FooMelbourne", "2020-10-22",
      //   function(_error, _searchbox) {
          done();
      // });
    });

    it('_searchFromServer returns expected flights data', function (done) {
      const _subject = new describedClass({
        from: "FooSydney", to: "FooMelbourne", travelDate: "2020-10-22"
      });

      _subject._searchFromServer("FooSydney", "FooMelbourne", "2020-10-22",
        function(_error, searchbox) {
          expect(searchbox.state.results).toEqual(
            { '2020-10-22': sydneyToMelbourneFlightSearchData }
          );
          done();
        });
    });
  });
});
