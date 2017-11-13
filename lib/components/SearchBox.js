// For server-side testing primarily
if (typeof exports !== 'undefined') {
  if (typeof SearchForm === 'undefined') {
    var SearchForm = require('./SearchForm');
  }
  if (typeof SearchResult === 'undefined') {
    var SearchResult = require('./SearchResult');
  }
  if (typeof NullSearchResult === 'undefined') {
    var NullSearchResult = require('./NullSearchResult');
  }
  if (typeof XMLHttpRequest === 'undefined') {
    var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
  }
}

SearchBox.prototype.state = {
  hasUpdatedResults: false,

  domainURL: 'http://localhost:3000',
  searchPath: '/search',

  from: "",
  to: "",
  travelDate: "",

  results: []
};

function SearchBox(properties) {
  // this.update = function() {};
  this.reRenderCallback = function() {};
  this.reRenderLocation = {};
  this.setState(properties);
};

SearchBox.prototype.setState = function (properties) {
  this.state = Object.assign({}, this.state, properties);

  var self = this;
  var parentEl = this.reRenderLocation;
  // this.update(self, parentEl);
  this.reRenderCallback(self, parentEl);
};

SearchBox.prototype.render = function () {
  var self = this;
  var form = new SearchForm({
    findSearchResults: self._searchFromServer.bind(self),

    from: self.state.from,
    to: self.state.to,
    travelDate: self.state.travelDate
  });
  var results = this._getResults();

  var el = document.createElement('div');
  el.innerHTML = '<div class="search-box"></div>';
  el.firstChild.appendChild(form.render());
  results.map(function (result) {
    el.firstChild.appendChild(result.render());
  });

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
SearchBox.prototype._getResults = function () {
  if (!this.state.hasUpdatedResults) { return []; }

  var results = this.state.results;

  if (results.length > 0) {
    return results.map(function (result) {
      return new SearchResult(result);
    });
  } else {
    return [new NullSearchResult()];
  }
};

function apiURL(from, to, travelDate, self) {
  return `${ self.state.domainURL }${ self.state.searchPath }` +
  `?from=${ from }&to=${ to }&date=${ travelDate }`;
}

// SearchBox.prototype._updateResults = function (from, to, travel_date) {
SearchBox.prototype._searchFromServer = function (from, to, travelDate, callback) {
  var self = this;
  var apiURI = apiURL(from, to, travelDate, self);
  var xhr = new XMLHttpRequest();

  xhr.open('get', apiURI, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 400) {
      var data = JSON.parse(xhr.responseText);
      self.setState({
        hasUpdatedResults: (data.length > 0),
        from: from,
        to: to,
        travelDate: travelDate,
        results: data
      });
      (typeof callback === 'function') && callback(null, data);
    } else {
      // error
      (typeof callback === 'function') && callback(xhr.status, []);
      // update errors object?
      // self.setState({
      //   errors: errors.push({})
      // });
    }
  }.bind(self);
  xhr.send();
}

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
