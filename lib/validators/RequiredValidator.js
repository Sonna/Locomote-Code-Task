function RequiredValidator() {};

RequiredValidator.validate = function(context, property, value) {
  if (!value || /^\s*$/.test(value)) {
    context.errors[property] = property + ' is required (cannot be blank)';
  }
}

// module.exports = RequiredValidator;
if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = RequiredValidator;
  }
  exports.RequiredValidator = RequiredValidator;
}
else if (typeof root !== 'undefined') {
  root.RequiredValidator = RequiredValidator;
}
else {
  window.RequiredValidator = RequiredValidator;
}
