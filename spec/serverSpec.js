const url = require('url');

var request = require('request');
var server = require('../server.js');

const baseURL = 'http://localhost:3000/';
const airlinesURL = url.resolve(baseURL, 'airlines');

describe('Application Server', function() {
  describe('GET /', function() {
    it('returns status code 200', function(done) {
      request.get(baseURL, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  describe('GET /airlines', function() {
    it('returns status code 200', function(done) {
      request.get(airlinesURL, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('returns an array of values', function(done) {
      request.get(airlinesURL, function(error, response, body) {
        let data = JSON.parse(response.body);
        expect(data).toEqual(jasmine.any(Array));
        done();
      });
    });
  });
});
