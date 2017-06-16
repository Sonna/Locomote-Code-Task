const nock = require('nock');

// - [node-nock/nock: HTTP mocking and expectations library]
//   (https://github.com/node-nock/nock/)
beforeAll(function () {
  nock.disableNetConnect();
  nock.enableNetConnect('localhost');
});
