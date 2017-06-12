function initialize(event) {
  var form = new SearchForm();
  document.getElementById('main').innerHTML = form.render();
};

(function () {
  initialize();
})();
