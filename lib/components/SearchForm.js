SearchForm.prototype.state = {
  findSearchResults: function (from, to, travel_date) {}
};

function SearchForm(properties) {
  this.state = Object.assign({}, this.state, properties);
};

SearchForm.prototype.render = function () {
  var form = document.createElement('form');
  form.setAttribute('id', 'search-form');
  form.addEventListener('submit', this._handleSubmit.bind(this))

  var fromLabel = document.createElement('label');
  fromLabel.setAttribute("for", "from");
  fromLabel.innerHTML = "From location";
  form.appendChild(fromLabel);

  var fromInput = document.createElement('input');
  fromInput.setAttribute("type", "text");
  fromInput.setAttribute("name", "from");
  form.appendChild(fromInput);

  var toLabel = document.createElement('label');
  toLabel.setAttribute("for", "to");
  toLabel.innerHTML = "To location";
  form.appendChild(toLabel);

  var toInput = document.createElement('input');
  toInput.setAttribute("type", "text");
  toInput.setAttribute("name", "to");
  form.appendChild(toInput);

  var travelDateLabel = document.createElement('label');
  travelDateLabel.setAttribute("for", "travel_date");
  travelDateLabel.innerHTML = "Travel date";
  form.appendChild(travelDateLabel);

  var travelDateInput = document.createElement('input');
  travelDateInput.setAttribute("type", "text");
  travelDateInput.setAttribute("name", "travel_date");
  form.appendChild(travelDateInput);

  var submitInput = document.createElement('input');
  submitInput.setAttribute("type", "submit");
  submitInput.setAttribute("value", "Search");
  form.appendChild(submitInput);

  return form;
  // return(
  //   `<form id="search-form">
  //     <label for="from">From location</label>
  //     <input type="text" name="from">
  //     <label for="to">To location</label>
  //     <input type="text" name="to">
  //     <label for="travel_date">Travel date</label>
  //     <input type="text" name="travel_date">
  //     <input type="submit" value="Search">
  //   </form>`
  // );
};

SearchForm.prototype._handleSubmit = function (event) {
  event.preventDefault();
  var formData = event.target;

  var from = formData.elements.from.value;
  var to = formData.elements.to.value;
  var travel_date = formData.elements.travel_date.value;

  this.state.findSearchResults(from, to, travel_date);
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
