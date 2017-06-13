const jsdom = require("jsdom");
const JSDOM = jsdom.JSDOM;

// - [Automatically unit testing client-side JavaScript with Jasmine and Node.js]
//   (http://www.nfriedly.com/techblog/2013/02/automatically-unit-testing-client-side-javascript-with-jasmine-and-node-js/)
beforeAll(function () {
  window = (new JSDOM('<html><head></head><body><section id="main"></section></body></html>')).window;

  // if(Object.keys(window).length === 0) {
  //   // this hapens if contextify, one of jsdom's dependencies doesn't install correctly
  //   // (it installs different code depending on the OS, so it cannot get checked in.);
  //   throw "jsdom failed to create a usable environment, try uninstalling and reinstalling it";
  // }

  global.window = window;
  global.document = window.document;
});
