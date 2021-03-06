# Steps undertaken

Review the Code Task.

Wrote up some notes on what the project might look like, where it might lead and
what dependencies may be needed (see `doc/notes.md`). Also, decided on using
Node & ExpressJS for the back-end because of the line

> We use node.js [...]

And should brush up on it, whilst working on this coding task, when there is an
expectation that it will be primarily used within the workplace.

Begun to setup the project environment to build said Node project.

Set the Node version of the project to most stable release at time of writing,
`6.10.3`:

```console
    $ echo '6.10.3' > .node-version
```

NOTE:
  Assumes Node installed and setup, also assumes that a Node Version Manager is
  being used (`nodenv` was being used).

NOTE:
  Also, ran the following commands to update non-work / home laptop for Node

  ```
    $ brew update && brew upgrade node-build
    $ nodenv install 6.10.3
  ```

  _`nodenv` was previously installed, although the following command will
  install it on Mac OS X:_

  ```
    $ brew install nodenv
  ```

  **References:**
  - [nodenv/nodenv: Manage multiple NodeJS versions.](https://github.com/nodenv/nodenv#homebrew-on-mac-os-x)

Setup a remote Git repository to backup project files, and added it to the
current project.

```console
    $ git remote add origin https://Sonna@bitbucket.org/Sonna/locomote-code-task.git
    $ git push -u origin master
```

Initialize the Node project using NPM

```console
    $ npm init

    This utility will walk you through creating a package.json file.
    It only covers the most common items, and tries to guess sensible defaults.

    See `npm help json` for definitive documentation on these fields
    and exactly what they do.

    Use `npm install <pkg> --save` afterwards to install a package and
    save it as a dependency in the package.json file.

    Press ^C at any time to quit.
    name: (locomote_code_task)
    version: (1.0.0)
    description: A Flight Search interface for the locomote code task.
    entry point: (index.js)
    test command:
    git repository: (https://Sonna@bitbucket.org/Sonna/locomote-code-task.git)
    keywords:
    author: Alex Sonneveld <alex@sonneveld.com.au>
    license: (ISC)
    About to write to /Users/Sonna/Projects/javascript/locomote_code_task/package.json:

    {
      "name": "locomote_code_task",
      "version": "1.0.0",
      "description": "A Flight Search interface for the locomote code task.",
      "main": "index.js",
      "directories": {
        "doc": "doc"
      },
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "repository": {
        "type": "git",
        "url": "git+https://Sonna@bitbucket.org/Sonna/locomote-code-task.git"
      },
      "author": "Alex Sonneveld <alex@sonneveld.com.au>",
      "license": "ISC",
      "homepage": "https://bitbucket.org/Sonna/locomote-code-task#readme"
    }


    Is this ok? (yes)
```

Install Jasmine for Behaviour Driven Development (BDD) test environment /
workflow

```console
    $ npm install jasmine-node --save-dev

    locomote_code_task@1.0.0 /Users/Sonna/Projects/javascript/locomote_code_task
    └─┬ jasmine@2.6.0
      ├── exit@0.1.2
      ├─┬ glob@7.1.2
      │ ├── fs.realpath@1.0.0
      │ ├─┬ inflight@1.0.6
      │ │ └── wrappy@1.0.2
      │ ├─┬ minimatch@3.0.4
      │ │ └─┬ brace-expansion@1.1.7
      │ │   ├── balanced-match@0.4.2
      │ │   └── concat-map@0.0.1
      │ ├── once@1.4.0
      │ └── path-is-absolute@1.0.1
      └── jasmine-core@2.6.2
```

Initialize Jasmine specification tests directory `spec/` and configuration

```console
    $ ./node_modules/.bin/jasmine init
```

Update `package.json` to use Jasmine for tests and when using the Node Test
command `npm test`

```diff
diff --git i/package.json w/package.json
index 39b6555..a3d0e4d 100644
--- i/package.json
+++ w/package.json
@@ -7,7 +7,7 @@
     "doc": "doc"
   },
   "scripts": {
-    "test": "echo \"Error: no test specified\" && exit 1"
+    "test": "jasmine"
   },
   "repository": {
     "type": "git",
```

Ensure that the test runner is setup correctly and run without tests

```console
    $ npm test

    > locomote_code_task@1.0.0 test /Users/Sonna/Projects/javascript/locomote_code_task
    > jasmine

    Started


    No specs found
    Finished in 0.003 seconds
```

**References:**
- [Getting Started](https://jasmine.github.io/pages/getting_started.html)
- [mhevery/jasmine-node: Integration of Jasmine Spec framework with Node.js](https://github.com/mhevery/jasmine-node)

Note:
  Update `.gitignore` file to ignore the `node_modules/` directory

  ```console
    $ echo 'node_modules/' >> .gitignore
  ```

Update the README to explain how to use this project and set it up with its
dependencies (this could be assumed, but should be thorough rather than assume).

Add Request Node library to handle requests against our application during tests
and the external locomote API.

```console
    $ npm install request --save

    └─┬ request@2.81.0
      ├── aws-sign2@0.6.0
      ├── aws4@1.6.0
      ├── caseless@0.12.0
      ├─┬ combined-stream@1.0.5
      │ └── delayed-stream@1.0.0
      ├── extend@3.0.1
      ├── forever-agent@0.6.1
      ├─┬ form-data@2.1.4
      │ └── asynckit@0.4.0
      ├─┬ har-validator@4.2.1
      │ ├─┬ ajv@4.11.8
      │ │ ├── co@4.6.0
      │ │ └─┬ json-stable-stringify@1.0.1
      │ │   └── jsonify@0.0.0
      │ └── har-schema@1.0.5
      ├─┬ hawk@3.1.3
      │ ├── boom@2.10.1
      │ ├── cryptiles@2.0.5
      │ ├── hoek@2.16.3
      │ └── sntp@1.0.9
      ├─┬ http-signature@1.1.1
      │ ├── assert-plus@0.2.0
      │ ├─┬ jsprim@1.4.0
      │ │ ├── assert-plus@1.0.0
      │ │ ├── extsprintf@1.0.2
      │ │ ├── json-schema@0.2.3
      │ │ └── verror@1.3.6
      │ └─┬ sshpk@1.13.0
      │   ├── asn1@0.2.3
      │   ├── assert-plus@1.0.0
      │   ├── bcrypt-pbkdf@1.0.1
      │   ├─┬ dashdash@1.14.1
      │   │ └── assert-plus@1.0.0
      │   ├── ecc-jsbn@0.1.1
      │   ├─┬ getpass@0.1.7
      │   │ └── assert-plus@1.0.0
      │   ├── jodid25519@1.0.2
      │   ├── jsbn@0.1.1
      │   └── tweetnacl@0.14.5
      ├── is-typedarray@1.0.0
      ├── isstream@0.1.2
      ├── json-stringify-safe@5.0.1
      ├─┬ mime-types@2.1.15
      │ └── mime-db@1.27.0
      ├── oauth-sign@0.8.2
      ├── performance-now@0.2.0
      ├── qs@6.4.0
      ├── safe-buffer@5.1.0
      ├── stringstream@0.0.5
      ├─┬ tough-cookie@2.3.2
      │ └── punycode@1.4.1
      ├── tunnel-agent@0.6.0
      └── uuid@3.0.1
```

Add the Express Node library as a project dependency to use later as the
application back-end server for serving the required `/airlines`, `/airports`
and `/search` endpoints.

```
    $ npm install express --save

    locomote_code_task@1.0.0 /Users/Sonna/Projects/javascript/locomote_code_task
    └─┬ express@4.15.3
      ├─┬ accepts@1.3.3
      │ └── negotiator@0.6.1
      ├── array-flatten@1.1.1
      ├── content-disposition@0.5.2
      ├── content-type@1.0.2
      ├── cookie@0.3.1
      ├── cookie-signature@1.0.6
      ├─┬ debug@2.6.7
      │ └── ms@2.0.0
      ├── depd@1.1.0
      ├── encodeurl@1.0.1
      ├── escape-html@1.0.3
      ├── etag@1.8.0
      ├─┬ finalhandler@1.0.3
      │ └── unpipe@1.0.0
      ├── fresh@0.5.0
      ├── merge-descriptors@1.0.1
      ├── methods@1.1.2
      ├─┬ on-finished@2.3.0
      │ └── ee-first@1.1.1
      ├── parseurl@1.3.1
      ├── path-to-regexp@0.1.7
      ├─┬ proxy-addr@1.1.4
      │ ├── forwarded@0.1.0
      │ └── ipaddr.js@1.3.0
      ├── range-parser@1.2.0
      ├─┬ send@0.15.3
      │ ├── destroy@1.0.4
      │ ├── http-errors@1.6.1
      │ └── mime@1.3.4
      ├── serve-static@1.12.3
      ├── setprototypeof@1.0.3
      ├── statuses@1.3.1
      ├─┬ type-is@1.6.15
      │ └── media-typer@0.3.0
      ├── utils-merge@1.0.0
      └── vary@1.1.1
```

Setup an ExpressJS server application to serve up an `index.html` page from the
root path `/` on port `3000`; e.g. `http://localhost:3000/`

```javascript
// server.js
const express = require('express');
const app = express();

app.use(express.static('public'));

app.listen(3000);
```

And create the initial `index.html` page to serve within the `public` directory;
e.g.

```html
<!DOCTYPE html>
<html>
<head>
  <title>JS code task</title>
</head>
<body>
</body>
</html>
```

Add a simple test to enure that the static files are being served by the Express
application server and that tests can find the application correctly:

```javascript
// serverSpec.js
var request = require('request');
var server = require('../server.js');

var baseURL = 'http://localhost:3000/'

describe('Application Server', function() {
  describe('GET /', function() {
    it('returns status code 200', function(done) {
      request.get(baseURL, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
});
```

Run all tests to ensure they work

```console
    $ npm test

    > locomote_code_task@1.0.0 test /Users/Sonna/Projects/javascript/locomote_code_task
    > jasmine

    Started
    .


    1 spec, 0 failures
    Finished in 0.04 seconds
```

Add a simple stylesheet to serve as an additional static file from the server
and to later use to style the front-end of the application

```css
/* assets/stylesheets/application.css */
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font: 13px Helvetica, Arial; }
form { padding: 3px; }
form label { margin: 10px; }
form input { margin: 10px; padding: 10px; }
```

Update the `public/index.html` to reference the application stylesheet

```diff
diff --git i/public/index.html w/public/index.html
index e12e110..5fa1f71 100644
--- i/public/index.html
+++ w/public/index.html
@@ -2,6 +2,7 @@
 <html>
 <head>
   <title>JS code task</title>
+  <link rel="stylesheet" href="assets/stylesheets/application.css">
 </head>
 <body>
 </body>
```

Add the appropriate test to ensure the asset URL can be reached and responds.

Add the appropriate test for `/airlines` endpoint on the `app` server

```javascript
const url = require('url');

const baseURL = 'http://localhost:3000/';
const airlinesURL = url.resolve(baseURL, 'airlines');

// ...

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
        expect(data).toEqual([]);
        done();
      });
    });
  });
```

Esnure it fails

```console
    $ npm test

    > locomote_code_task@1.0.0 test /Users/Sonna/Projects/javascript/locomote_code_task
    > jasmine

    Started
    .F.

    Failures:
    1) Application Server GET /airlines returns status code 200
      Message:
        Expected 404 to be 200.
      Stack:
        Error: Expected 404 to be 200.
            at Request._callback (/Users/Sonna/Projects/javascript/locomote_code_task/spec/serverSpec.js:22:37)
            at Request.self.callback (/Users/Sonna/Projects/javascript/locomote_code_task/node_modules/request/request.js:188:22)
            at emitTwo (events.js:106:13)
            at Request.emit (events.js:191:7)

    3 specs, 1 failure
    Finished in 0.062 seconds

    npm ERR! Test failed.  See above for more details.
```

Then add it to the application `server.js`

```javascript
// Lists all available airlines from the Flight API.
app.get('/airlines', function (req, res) {
  var airlines = [];
  res.send(200, airlines);
})

```

Run tests to ensure it passes

```console
    npm test

    > locomote_code_task@1.0.0 test /Users/Sonna/Projects/javascript/locomote_code_task
    > jasmine

    Started
    .express deprecated res.send(status, body): Use res.status(status).send(body) instead server.js:9:7
    ..


    3 specs, 0 failures
    Finished in 0.057 seconds
```

Fix the deprecation warning and continue

```javascript
// Lists all available airlines from the Flight API.
app.get('/airlines', function (req, res) {
  var airlines = [];
  res.status(200).send(airlines);
})

```

Begin building a Flight API object to consume external URL requests from the
locomote Code Task application and to keep it separate from the application
server main body / routing code.

Install Nock Node library as another development / test dependency to Mock the
external HTTP Requests, for the purpose of the making external Flight API calls.

```console
    $ npm install --save-dev nock

    locomote_code_task@1.0.0 /Users/Sonna/Projects/javascript/locomote_code_task
    └─┬ nock@9.0.13
      ├─┬ chai@3.5.0
      │ ├── assertion-error@1.0.2
      │ ├─┬ deep-eql@0.1.3
      │ │ └── type-detect@0.1.1
      │ └── type-detect@1.0.0
      ├── deep-equal@1.0.1
      ├── lodash@4.17.4
      ├─┬ mkdirp@0.5.1
      │ └── minimist@0.0.8
      └── propagate@0.4.0
```

_Alternatively a library like Ruby's VCR gem, but for Node could be used to
record external API requests and play them back, however this will be simpler
and direct although potentially requires more maintenance._

Create an appropriate test to build a new instance of the FlightAPI that
responds to an `airlines` method that returns an array of airlines, which should
match the Mock data that intercepts the locomote code task airlines URL;
`'http://node.locomote.com/code-task/airlines'`

```javascript
// spec/lib/services/FlightAPISpec.js
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

```

Create the corresponding FlightAPI class to fulfil the above specification tests
and generates a collection of airlines data from the external locomote API

```javascript
const request = require('request');

function FlightAPI() {};

FlightAPI.prototype.airlines = function (callback) {
  request.get('http://node.locomote.com/code-task/airlines', function(error, response, body) {
    let parsed = JSON.parse(body);
    callback(response.statusCode, parsed);
  });
};

module.exports = FlightAPI;
```

Update the main application to use this new `FlightAPI` class within its calls

```javascript
const FlightAPI = require('./lib/services/FlightAPI');
const api = new FlightAPI();

// ...

app.get('/airlines', function (req, res) {
  api.airlines(function (statusCode, data) {
    res.status(statusCode).json(data);
  });
})
```

_Then refactor the Flght API class to be configurable:_

```javascript
// diff --git i/lib/services/FlightAPI.js w/lib/services/FlightAPI.js
const request = require('request');
const url = require('url');

// function FlightAPI() {};
FlightAPI.prototype.properties = {
  baseURL: 'http://node.locomote.com/code-task/',
  airlinesPath: 'airlines'
};

function FlightAPI(options) {
  this.properties = Object.assign({}, this.properties, options);
};

FlightAPI.prototype.airlines = function (callback) {
  // request.get('http://node.locomote.com/code-task/airlines', function(error, response, body) {
  request.get(this.airlinesURL(), function (error, response, body) {
    let parsed = JSON.parse(body);
    callback(response.statusCode, parsed);
  });
};

FlightAPI.prototype.airlinesURL = function () {
  return url.resolve(this.properties.baseURL, this.properties.airlinesPath);
}

module.exports = FlightAPI;

```


```
    $ npm install --save-dev xmlhttprequest

    locomote_code_task@1.0.0 /Users/Sonna/Projects/javascript/locomote_code_task
    └── xmlhttprequest@1.8.0
```
