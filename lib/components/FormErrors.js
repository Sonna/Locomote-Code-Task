FormErrors.prototype.props = {
  errors: {}
};

function FormErrors(properties) {
  this.props = Object.assign({}, this.props, properties);
};

FormErrors.prototype.render = function () {
  var self = this;
  var el = document.createElement('div');

  el.innerHTML =
    '<ul class="form-errors">'+
      Object.keys(self.props.errors).map(function(fieldName, _index) {
        if (self.props.errors[fieldName].length > 0) {
          return `<li>${ self.props.errors[fieldName] }</li>`;
        } else {
          return '';
        }
      }).join('') +
    '</ul>';

  return el.firstChild;
};

// module.exports = FormErrors;
if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = FormErrors;
  }
  exports.FormErrors = FormErrors;
}
else if (typeof root !== 'undefined') {
  root.FormErrors = FormErrors;
}
else {
  window.FormErrors = FormErrors;
}
