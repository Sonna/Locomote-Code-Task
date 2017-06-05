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
  });

  describe('default properties', function () {
    const baseURL = 'https://example.com/';
    const airlinesPath = 'air_lines';

    let subject = new describedClass({
      baseURL: 'https://example.com/',
      airlinesPath: 'air_lines'
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
});
