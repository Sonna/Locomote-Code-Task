const request = require('request');

// - [Scraping web pages using Node.js using request+promise (Example)]
//   (https://coderwall.com/p/9cifuw/scraping-web-pages-using-node-js-using-request-promise)
beforeAll(function () {
  this.requestPromise = function (url, json) {
    json = json || false;
    return new Promise(function (resolve, reject) {
      request({ url: url, json: json }, function (error, response, body) {
        if (error) {
          return reject(error);
        } else if (response.statusCode !== 200) {
          error = new Error("Unexpected status code: " + response.statusCode);
          error.response = response;
          return reject(error);
        }
        resolve(body);
      });
    });
  };
});
