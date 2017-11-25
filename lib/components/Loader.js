Loader.prototype.props = {
  loading: false
};

function Loader(properties) {
  this.props = Object.assign({}, this.props, properties);
};

Loader.prototype.render = function () {
  var self = this;
  var el = document.createElement('div');

  el.setAttribute('id', 'loader');
  el.style.display = this.props.loading ? 'block' : 'none';

  return el;
};

// module.exports = Loader;
if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = Loader;
  }
  exports.Loader = Loader;
}
else if (typeof root !== 'undefined') {
  root.Loader = Loader;
}
else {
  window.Loader = Loader;
}
