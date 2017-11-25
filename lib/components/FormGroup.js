// For server-side testing primarily
if (typeof exports !== 'undefined') {
  if (typeof Input === 'undefined') {
    var Input = require('./Input');
  }
  if (typeof Label === 'undefined') {
    var Label = require('./Label');
  }
}

FormGroup.prototype.props = {
  label: {},
  input: {}
};

function FormGroup(properties) {
  this.props = Object.assign({}, this.props, properties);
};

FormGroup.prototype.render = function () {
  var self = this;
  var el = document.createElement('div');
  el.setAttribute('class', 'input-group');

  if (Object.keys(self.props.label).length !== 0) {
    var label = new Label(self.props.label);
    el.appendChild(label.render());
  }

  if (Object.keys(self.props.input).length !== 0) {
    var input = new Input(self.props.input);
    el.appendChild(input.render());
  }

  return el;
};

// module.exports = FormGroup;
if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = FormGroup;
  }
  exports.FormGroup = FormGroup;
}
else if (typeof root !== 'undefined') {
  root.FormGroup = FormGroup;
}
else {
  window.FormGroup = FormGroup;
}
