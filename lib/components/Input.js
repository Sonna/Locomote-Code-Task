Input.prototype.props = {
  type: "text",
  name: "",
  value: "",
  placeholder: "",
  required: false,
  disabled: false
};

function Input(properties) {
  this.props = Object.assign({}, this.props, properties);
  // this.handleChange = function() {};
  // this.handleBlur = function() {};
};

Input.prototype.render = function () {
  var self = this;
  var el = document.createElement('div');

  el.innerHTML =
    `<input type="${ self.props.type }" ` +
            `name="${ self.props.name }" ` +
            `value="${ self.props.value }"` +
            `${ self.props.placeholder ? 'placeholder="' + self.props.placeholder + '"' : ''}` +
            `${ self.props.required ? ' required' : '' }` +
            `${ self.props.disabled ? ' disabled' : '' }>`;

  var input = el.firstChild;
  // input.addEventListener('change', this.handleChange.bind(this))
  // input.addEventListener('blur', this.handleBlur.bind(this))

  return input;
};

// module.exports = Input;
if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = Input;
  }
  exports.Input = Input;
}
else if (typeof root !== 'undefined') {
  root.Input = Input;
}
else {
  window.Input = Input;
}
