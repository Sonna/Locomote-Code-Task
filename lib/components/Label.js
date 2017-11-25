Label.prototype.props = {
  for: "",
  content: ""
};

function Label(properties) {
  this.props = Object.assign({}, this.props, properties);
};

Label.prototype.render = function () {
  var self = this;
  var el = document.createElement('label');
  var content = document.createTextNode(self.props.content);

  el.setAttribute('for', self.props.for);
  el.appendChild(content);

  return el;
};

// module.exports = Label;
if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = Label;
  }
  exports.Label = Label;
}
else if (typeof root !== 'undefined') {
  root.Label = Label;
}
else {
  window.Label = Label;
}
