// For server-side testing primarily
if (typeof exports !== 'undefined') {
  if (typeof RequiredValidator === 'undefined') {
    var RequiredValidator = require('../validators/RequiredValidator');
  }
  if (typeof DateFormatValidator === 'undefined') {
    var DateFormatValidator = require('../validators/DateFormatValidator');
  }
  if (typeof SearchForm === 'undefined') {
    var SearchForm = require('./SearchForm');
  }
  if (typeof SearchResult === 'undefined') {
    var SearchResult = require('./SearchResult');
  }
  if (typeof NullSearchResult === 'undefined') {
    var NullSearchResult = require('./NullSearchResult');
  }
  if (typeof NullComponent === 'undefined') {
    var NullComponent = require('./NullComponent');
  }
  if (typeof Tabs === 'undefined') {
    var Tabs = require('./Tabs');
  }
  if (typeof XMLHttpRequest === 'undefined') {
    var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
  }
}

var BLANK_DAY_OFFSET = 2;

SearchBox.prototype.state = {
  hasUpdatedResults: false,

  domainURL: 'http://localhost:3000',
  searchPath: '/search',

  from: "",
  to: "",
  travelDate: "",

  errors: {},
  // valid: false,
  validations: {
    from: [RequiredValidator],
    to: [RequiredValidator],
    travelDate: [RequiredValidator, DateFormatValidator]
  },

  loadingResults: false,
  resultsSort: function (a, b) { return a.price - b.price; },
  results: {}
};

function SearchBox(properties) {
  // this.update = function() {};
  this.reRenderCallback = function() {};
  this.reRenderLocation = {};
  this.setState(properties);
};

SearchBox.prototype.setState = function (properties, callback) {
  this.state = Object.assign({}, this.state, properties);

  var self = this;
  var parentEl = this.reRenderLocation;
  // this.update(self, parentEl);
  this.reRenderCallback(self, parentEl);

  (typeof callback === 'function') && callback(null, self);
};

SearchBox.prototype.render = function () {
  var self = this;
  var form = new SearchForm({
    disabled: self.state.loadingResults,
    errors: self.state.errors,

    from: self.state.from,
    to: self.state.to,
    travelDate: this.state.travelDate
  });
  form.props.handleSubmit = self._handleSubmit.bind(self);
  var results = this._buildSearchResults();

  // Add Search Form
  var el = document.createElement('div');
  el.innerHTML = '<div class="search-box">' +
    `<div id="loader" style="display: ${ this.state.loadingResults ? 'block' : 'none' };"></div>` +
  '</div>';
  el.firstChild.appendChild(form.render());

  // Add Search Results
  var searchResultsEl = document.createElement('div');
  searchResultsEl.innerHTML = '<section class="search-results"></section>';
  searchResultsEl.firstChild.appendChild(results.render());
  el.firstChild.appendChild(searchResultsEl.firstChild);

  return el.firstChild;
  // el.innerHTML =
  //   `<div class="search-box">` +
  //     `${ form.render() }` +
  //     `<ul id="results">` +
  //      `${ results.map(function (result) { return result.render(); }) }` +
  //    `</ul>` +
  //   `</div>`;
};

// Builds an collection of results, wrapped in view components.
// It is called within `render()`
SearchBox.prototype._buildSearchResults = function () {
  if (!this.state.hasUpdatedResults) {
    return new NullComponent();
  };

  var self = this;
  var content = {};
  var results = this.state.results;

  if (Object.keys(results).length !== 0 && results.constructor === Object) {
    Object.keys(results).sort().forEach(function (key, _index) {
      var values = results[key].sort(self.state.resultsSort);
      content[key] = values.map(function (value) {
        return new SearchResult(value);
      });
    });
    return new Tabs({ content: content, defaultOpenIndex: BLANK_DAY_OFFSET });
  } else if (this.state.hasUpdatedResults) {
    return new NullSearchResult();
  } else {
    return new NullComponent();
  }
};

function apiURL(from, to, travelDate, self) {
  return `${ self.state.domainURL }${ self.state.searchPath }` +
  `?from=${ from }&to=${ to }&date=${ travelDate }`;
}

function travelDateDaysOffset(date, days) {
  var newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

function travelDates(travelDate) {
  var date = travelDate;
  if ((typeof travelDate === 'undefined') || travelDate === '') {
    return [];
  }

  return [
    travelDateDaysOffset(date, -2).toISOString().slice(0,10),
    travelDateDaysOffset(date, -1).toISOString().slice(0,10),
    date,
    travelDateDaysOffset(date, +1).toISOString().slice(0,10),
    travelDateDaysOffset(date, +2).toISOString().slice(0,10)
  ];
}

SearchBox.prototype._handleSubmit = function (from, to, travelDate, callback) {
  this.canBeSubmitted(from, to, travelDate, callback);
};

// SearchBox.prototype._updateResults = function (from, to, travel_date) {
SearchBox.prototype._searchFromServer = function (from, to, travelDate, callback) {
  var self = this;
  var promises = travelDates(travelDate).map(function (newTravelDate) {
    return new Promise(function (success, fail) {
      var apiURI = apiURL(from, to, newTravelDate, self);
      var xhr = new XMLHttpRequest();

      xhr.open('get', apiURI, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 400) {
          var responseText = xhr.responseText;
          responseText = ((typeof responseText === 'undefined') ? '[]' : responseText);
          var data = JSON.parse(responseText);
          success({ key: newTravelDate, value: data });
        } else {
          fail(xhr.status);
          // update errors object?
          // this.setState({
          //   errors: errors.push({})
          // });
        }
      }.bind(self);
      xhr.send();
    });
  });

  Promise.all(promises)
    .then(function (results) {
      // Remove empty results
      var reducedResults = results.reduce(function (obj, item) {
        if(item.value.length > 0) {
          obj[item.key] = item.value;
        }
        return obj;
      }, {});

      // Update SearchBox with results and stop loading animation
      self.setState({
        hasUpdatedResults: true,
        from: from,
        to: to,
        travelDate: travelDate,
        loadingResults: false,
        results: reducedResults
      }, callback);
    }).catch(function (error) {
      console.log(error);
      (typeof callback === 'function') && callback(error, {});
    });
}

// SearchBox.prototype.canBeSubmitted = function(from, to, travelDate) {
SearchBox.prototype.canBeSubmitted = function(from, to, travelDate, callback) {
  var self = this;
  var errorsContext = { errors: {} };
  var validations = self.state.validations;

  // Reset errors
  // this.props.errors = {};
  // Animate loading of results
  // document.getElementById('main').classList.add('overlay');
  self.setState({
    from: from,
    to: to,
    travelDate: travelDate,
    errors: {},
    hasUpdatedResults: false,
    loadingResults: true,
    results: self.state.results
  });

  Object.keys(validations).forEach(function(property) {
    var validators = validations[property];
    var value = self.state[property];

    validators.forEach(function(validator) {
      // validator.validate(self.state, property, value);
      validator.validate(errorsContext, property, value);
    })
  });

  if (Object.keys(errorsContext.errors).length === 0) {
    self.setState({
      from: from,
      to: to,
      travelDate: travelDate,
      // valid: true,
      hasUpdatedResults: false,
      loadingResults: true,
      results: self.state.results
    }, self._searchFromServer(from, to, travelDate, callback));
  } else {
    self.setState({
      from: from,
      to: to,
      travelDate: travelDate,
      errors: errorsContext.errors,
      // valid: false,
      hasUpdatedResults: true,
      loadingResults: false,
      results: self.state.results
    }, callback);
  }
};


// module.exports = SearchBox;
if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = SearchBox;
  }
  exports.SearchBox = SearchBox;
}
else if (typeof root !== 'undefined') {
  root.SearchBox = SearchBox;
}
else {
  window.SearchBox = SearchBox;
}
