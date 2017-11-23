const nock = require('nock');
const request = require('request');

const describedClass = require('../../../app/controllers/AirportController');

describe('AirportController app controller', function () {
  describe('airportList', function () {
    const subject = describedClass;

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

    beforeEach(function () {
      nock('http://node.locomote.com')
        .get('/code-task/airports?q=FooMelbourne')
        // .query({ q: 'FooMelbourne' })
        .reply(200, melbourneAirportData);
    });


    it('returns an Array of airportList', function (done) {
      let request = {
        url: 'localhost:3000/airports?q=FooMelbourne'
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
          expect(JSON.parse(response.content)).toEqual(melbourneAirportData);
          expect(response.encoding).toEqual('utf-8');

          done();
        }
      };

      subject.airportList(request, response);
    });
  });
});
