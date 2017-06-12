SearchForm.prototype.state = {};

function SearchForm(properties) {
  this.state = Object.assign({}, this.state, properties);
};

SearchForm.prototype.render = function () {
  return(
    '<form id="search"></form>'
  );
};

// module.exports = SearchForm;
if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = SearchForm;
  }
  exports.SearchForm = SearchForm;
}
else if (typeof root !== 'undefined') {
  root.SearchForm = SearchForm;
}
else {
  window.SearchForm = SearchForm;
}
