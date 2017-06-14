function NullSearchResult() {
};

NullSearchResult.prototype.render = function () {
  var el = document.createElement('div');

  el.innerHTML =
    `<article id="null-search-result">` +
      '<h2 class="">No flights found</h2>' +
    `</article>`;

  return el.firstChild;
};

// module.exports = NullSearchResult;
if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = NullSearchResult;
  }
  exports.NullSearchResult = NullSearchResult;
}
else if (typeof root !== 'undefined') {
  root.NullSearchResult = NullSearchResult;
}
else {
  window.NullSearchResult = NullSearchResult;
}
