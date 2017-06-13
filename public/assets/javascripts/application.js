function initialize(event) {
  var form = new SearchForm({
    findSearchResults: function (from, to, travel_date) { console.log(from, to, travel_date) }
  });

  document.getElementById('main').appendChild(form.render());
};

(function () {
  initialize();
})();
