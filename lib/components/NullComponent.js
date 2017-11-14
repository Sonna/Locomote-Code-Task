function NullComponent() {};

NullComponent.prototype.render = function () {
  return document.createElement('div');
};

// module.exports = NullComponent;
if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = NullComponent;
  }
  exports.NullComponent = NullComponent;
}
else if (typeof root !== 'undefined') {
  root.NullComponent = NullComponent;
}
else {
  window.NullComponent = NullComponent;
}
