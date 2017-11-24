FormErrorsComponent.prototype.props = {
  errors: {}
};

function FormErrorsComponent(properties) {
  this.props = Object.assign({}, this.props, properties);
};

FormErrorsComponent.prototype.render = function () {
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

// module.exports = FormErrorsComponent;
if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = FormErrorsComponent;
  }
  exports.FormErrorsComponent = FormErrorsComponent;
}
else if (typeof root !== 'undefined') {
  root.FormErrorsComponent = FormErrorsComponent;
}
else {
  window.FormErrorsComponent = FormErrorsComponent;
}
