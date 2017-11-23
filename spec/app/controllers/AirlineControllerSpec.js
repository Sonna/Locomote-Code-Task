const nock = require('nock');
const request = require('request');

const describedClass = require('../../../app/controllers/AirlineController');

describe('AirlineController app controller', function () {
  describe('airlineList', function () {
    const subject = describedClass;

    const airlinesData = [
      { code: "FB", name: "FooBar" },
      { code: "SU", name: "Aeroflot" },
      { code: "MU", name: "China Eastern" },
      { code: "EK", name: "Emirates" },
      { code: "KE", name: "Korean Air lines" },
      { code: "QF", name: "Qantas" },
      { code: "SQ", name: "Singapore Airlines"}
    ];

    beforeEach(function () {
      // Mock external request response
      nock('http://node.locomote.com')
        .get('/code-task/airlines')
        .reply(200, airlinesData);
    });

    it('returns an Array of airlineList', function (done) {
      let request = {};
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
          expect(JSON.parse(response.content)).toEqual(airlinesData);
          expect(response.encoding).toEqual('utf-8');

          done();
        }
      };

      subject.airlineList(request, response);
    });
  });
});
