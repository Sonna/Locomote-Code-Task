// For server-side testing primarily
if (typeof exports !== 'undefined') {
  if (typeof SearchForm === 'undefined') {
    var SearchForm = require('./SearchForm');
  }
  if (typeof XMLHttpRequest === 'undefined') {
    var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
  }
}

SearchBox.prototype.state = {
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

SearchBox.prototype._getResults = function () {
  return this.state.results.map(function (result) {
    return new SearchResult(result);
  });
};

// SearchBox.prototype._updateResults = function (from, to, travel_date) {
SearchBox.prototype._searchFromServer = function (from, to, travelDate) {
  var apiURL =
    `${ this.state.domainURL }${ this.state.searchPath }` +
    `?form=${ from }&to=${ to }&travel_date=${ travelDate }`;

  var xhr = new XMLHttpRequest();
  xhr.open('get', apiURL, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function() {
    var data = JSON.parse(xhr.responseText);
    this.setState({
      from: from,
      to: to,
      travelDate: travelDate,
      results: data
    });
  }.bind(this);
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
