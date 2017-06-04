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

Install Jasmine-Node for Behaviour Driven Development (BDD) test environment /
workflow

```console
    $ npm install jasmine-node --save-dev
    npm WARN deprecated minimatch@0.2.14: Please update to minimatch 3.0.2 or higher to avoid a RegExp DoS issue
    npm WARN deprecated minimatch@0.3.0: Please update to minimatch 3.0.2 or higher to avoid a RegExp DoS issue
    npm WARN prefer global jasmine-node@1.14.5 should be installed with -g
    locomotive_code_task@1.0.0 /Users/Sonna/Projects/javascript/locomotive_code_task
    └─┬ jasmine-node@1.14.5
      ├── coffee-script@1.12.6
      ├─┬ gaze@0.3.4
      │ ├─┬ fileset@0.1.8
      │ │ └─┬ glob@3.2.11
      │ │   ├── inherits@2.0.3
      │ │   └── minimatch@0.3.0
      │ └─┬ minimatch@0.2.14
      │   ├── lru-cache@2.7.3
      │   └── sigmund@1.0.1
      ├─┬ jasmine-growl-reporter@0.0.3
      │ └── growl@1.7.0
      ├── jasmine-reporters@1.0.2
      ├── mkdirp@0.3.5
      ├── requirejs@2.3.3
      ├── underscore@1.8.3
      └── walkdir@0.0.11

```

**References:**
- [mhevery/jasmine-node: Integration of Jasmine Spec framework with Node.js](https://github.com/mhevery/jasmine-node)

Note:
  Update `.gitignore` file to ignore the `node_modules/` directory

  ```console
    $ echo 'node_modules/' >> .gitignore
  ```

Update the README to explain how to use this project and set it up with its
dependencies (this could be assumed, but should be thorough rather than assume).
