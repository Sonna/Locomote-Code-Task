SearchForm.prototype.props = {
  findSearchResults: function (from, to, travel_date) {},

  from: "",
  to: "",
  travelDate: ""
};

function SearchForm(properties) {
  this.props = Object.assign({}, this.props, properties);
};

SearchForm.prototype.render = function () {
  var el = document.createElement('div');

  el.innerHTML =
    '<form id="search-form">' +
      '<label for="from">From location</label>' +
      `<input type="text" name="from" value="${ this.props.from }">` +
      '<label for="to">To location</label>' +
      `<input type="text" name="to" value="${ this.props.to }">` +
      '<label for="travel_date">Travel date</label>' +
      `<input type="text" name="travel_date" value="${ this.props.travelDate }">` +
      '<input type="submit" value="Search">' +
    '</form>';

  var form = el.firstChild;
  form.addEventListener('submit', this._handleSubmit.bind(this))

  return form;
};

SearchForm.prototype._handleSubmit = function (event) {
  event.preventDefault();
  var formData = event.target;

  var from = formData.elements.from.value;
  var to = formData.elements.to.value;
  var travel_date = formData.elements.travel_date.value;

  this.props.findSearchResults(from, to, travel_date);
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
