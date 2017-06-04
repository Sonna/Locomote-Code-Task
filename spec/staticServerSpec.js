var request = require('request');
var server = require('../server.js');

var baseURL = 'http://localhost:3000/'

describe('Static Server', function() {
  describe('GET /assets/stylesheets/application.css', function() {
    it('returns status code 200', function(done) {
      const stylesheetURL = baseURL + '/assets/stylesheets/application.css';
      request.get(stylesheetURL, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
});
