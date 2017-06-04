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
    $ git remote add origin https://Sonna@bitbucket.org/Sonna/locomotive-code-task.git
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
    name: (locomotive_code_task)
    version: (1.0.0)
    description: A Flight Search interface for the Locomotive code task.
    entry point: (index.js)
    test command:
    git repository: (https://Sonna@bitbucket.org/Sonna/locomotive-code-task.git)
    keywords:
    author: Alex Sonneveld <alex@sonneveld.com.au>
    license: (ISC)
    About to write to /Users/Sonna/Projects/javascript/locomotive_code_task/package.json:

    {
      "name": "locomotive_code_task",
      "version": "1.0.0",
      "description": "A Flight Search interface for the Locomotive code task.",
      "main": "index.js",
      "directories": {
        "doc": "doc"
      },
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "repository": {
        "type": "git",
        "url": "git+https://Sonna@bitbucket.org/Sonna/locomotive-code-task.git"
      },
      "author": "Alex Sonneveld <alex@sonneveld.com.au>",
      "license": "ISC",
      "homepage": "https://bitbucket.org/Sonna/locomotive-code-task#readme"
    }


    Is this ok? (yes)
```

Install Jasmine for Behaviour Driven Development (BDD) test environment /
workflow

```console
    $ npm install jasmine-node --save-dev

    locomotive_code_task@1.0.0 /Users/Sonna/Projects/javascript/locomotive_code_task
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

    > locomotive_code_task@1.0.0 test /Users/Sonna/Projects/javascript/locomotive_code_task
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
and the external Locomotive API.

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

    locomotive_code_task@1.0.0 /Users/Sonna/Projects/javascript/locomotive_code_task
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
