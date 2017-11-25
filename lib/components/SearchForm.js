// For server-side testing primarily
if (typeof exports !== 'undefined') {
  if (typeof FormErrorsComponent === 'undefined') {
    var FormErrorsComponent = require('./FormErrorsComponent');
  }
}

SearchForm.prototype.props = {
  errors: {},

  findSearchResults: function (from, to, travel_date) {},

  from: "",
  to: "",
  travelDate: ""
};

function SearchForm(properties) {
  this.props = Object.assign({}, this.props, properties);
};

SearchForm.prototype.render = function () {
  var self = this;
  var el = document.createElement('div');
  el.innerHTML = '<form id="search-form"></form>';

  // Add Form Errors
  var formErrorsComponent = new FormErrorsComponent({
    errors: this.props.errors
  });
  el.firstChild.appendChild(formErrorsComponent.render());

  var fromInputEl = document.createElement('div');
  fromInputEl.innerHTML =
      '<div class="input-group">' +
        '<label for="from">From location</label>' +
        `<input type="text" name="from" value="${ self.props.from }">` +
      '</div>';
  el.firstChild.appendChild(fromInputEl.firstChild);

  var toInputEl = document.createElement('div');
  toInputEl.innerHTML =
      '<div class="input-group">' +
        '<label for="to">To location</label>' +
        `<input type="text" name="to" value="${ self.props.to }">` +
      '</div>';
  el.firstChild.appendChild(toInputEl.firstChild);

  var travelDateInputEl = document.createElement('div');
  travelDateInputEl.innerHTML =
      '<div class="input-group">' +
        '<label for="travel_date">Travel date</label>' +
        `<input type="text" name="travel_date" value="${ self.props.travelDate }">` +
      '</div>';
  el.firstChild.appendChild(travelDateInputEl.firstChild);

  var submitButtonEl = document.createElement('div');
  submitButtonEl.innerHTML =
      '<div class="input-group">' +
        `<input type="submit" value="Search">` +
      '</div>';
  // el.getElementById("myBtn").disabled = true;
  el.firstChild.appendChild(submitButtonEl.firstChild);

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
