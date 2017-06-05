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
});
