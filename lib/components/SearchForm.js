// For server-side testing primarily
if (typeof exports !== 'undefined') {
  if (typeof FormErrors === 'undefined') {
    var FormErrors = require('./FormErrors');
  }
  if (typeof Input === 'undefined') {
    var Input = require('./Input');
  }
}

SearchForm.prototype.props = {
  disabled: false,
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
  var formErrors = new FormErrors({
    errors: this.props.errors
  });
  el.firstChild.appendChild(formErrors.render());

  var fromInput = new Input({
    type: "text",
    name: "from",
    value: self.props.from,
    disabled: self.props.disabled
  });
  var fromInputEl = document.createElement('div');
  fromInputEl.innerHTML =
      '<div class="input-group">' +
        '<label for="from">From location</label>' +
      '</div>';
  fromInputEl.firstChild.appendChild(fromInput.render());
  el.firstChild.appendChild(fromInputEl.firstChild);

  var toInput = new Input({
    type: "text",
    name: "to",
    value: self.props.to,
    disabled: self.props.disabled
  });
  var toInputEl = document.createElement('div');
  toInputEl.innerHTML =
      '<div class="input-group">' +
        '<label for="to">To location</label>' +
      '</div>';
  toInputEl.firstChild.appendChild(toInput.render());
  el.firstChild.appendChild(toInputEl.firstChild);

  var travelDateInput = new Input({
    type: "text",
    name: "travel_date",
    value: self.props.travelDate,
    disabled: self.props.disabled
  });
  var travelDateInputEl = document.createElement('div');
  travelDateInputEl.innerHTML =
      '<div class="input-group">' +
        '<label for="travel_date">Travel date</label>' +
      '</div>';
  travelDateInputEl.firstChild.appendChild(travelDateInput.render());
  el.firstChild.appendChild(travelDateInputEl.firstChild);

  var submitButtonInput = new Input({
    type: "submit",
    name: "submit",
    value: "Search",
    disabled: self.props.disabled
  });
  var submitButtonEl = document.createElement('div');
  submitButtonEl.innerHTML = '<div class="input-group"></div>';
  submitButtonEl.firstChild.appendChild(submitButtonInput.render());
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
