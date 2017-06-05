const nock = require('nock');
const request = require('request');

const describedClass = require('../../../lib/services/FlightAPI');

describe('FlightAPI library', function () {
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
});
