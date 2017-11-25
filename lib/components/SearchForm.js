// For server-side testing primarily
if (typeof exports !== 'undefined') {
  if (typeof FormErrors === 'undefined') {
    var FormErrors = require('./FormErrors');
  }
  if (typeof FormGroup === 'undefined') {
    var FormGroup = require('./FormGroup');
  }
}

SearchForm.prototype.props = {
  disabled: false,
  errors: {},

  handleSubmit: function (from, to, travel_date) {},

  from: "",
  to: "",
  travelDate: ""
};

function SearchForm(properties) {
  this.props = Object.assign({}, this.props, properties);
  // this.handleSubmit = function (from, to, travel_date) {};
};

SearchForm.prototype.render = function () {
  var self = this;
  var el = document.createElement('form');
  el.setAttribute('id', 'search-form');

  // Add Form Errors
  var formErrors = new FormErrors({
    errors: this.props.errors
  });
  el.appendChild(formErrors.render());

  var fromFormGroup = new FormGroup({
    label: { for: 'from', content: 'From location', required: true },
    input: {
      type: "text",
      name: "from",
      value: self.props.from,
      required: true,
      disabled: self.props.disabled
    }
  });
  el.appendChild(fromFormGroup.render());

  var toFormGroup = new FormGroup({
    label: { for: 'to', content: 'To location', required: true },
    input: {
      type: "text",
      name: "to",
      value: self.props.to,
      required: true,
      disabled: self.props.disabled
    }
  });
  el.appendChild(toFormGroup.render());

  var travelDateFormGroup = new FormGroup({
    label: { for: 'travel_date', content: 'Travel date', required: true },
    input: {
      type: "text",
      name: "travel_date",
      value: self.props.travelDate,
      required: true,
      disabled: self.props.disabled
    }
  });
  el.appendChild(travelDateFormGroup.render());

  var submitButtonFormGroup = new FormGroup({
    input: {
      type: "submit",
      name: "submit",
      value: "Search",
      disabled: self.props.disabled
    }
  });
  el.appendChild(submitButtonFormGroup.render());

  el.addEventListener('submit', this._handleSubmit.bind(this))

  return el;
};

SearchForm.prototype._handleSubmit = function (event) {
  event.preventDefault();
  var formData = event.target;

  var from = formData.elements.from.value;
  var to = formData.elements.to.value;
  var travel_date = formData.elements.travel_date.value;

  this.props.handleSubmit(from, to, travel_date);
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
