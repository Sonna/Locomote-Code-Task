// - [Example: Regular Expression Matching a Valid Date]
//   (https://www.regular-expressions.info/dates.html)
// var VALID_DATE_REGEX_PATTERN =
//   '^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$';
var VALID_DATE_REGEX_PATTERN =
  /^(19|20)\d\d\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;

function DateFormatValidator() {};

DateFormatValidator.validate = function(context, property, value) {
  if (!value ||
      /^\s*$/.test(value) ||
      !VALID_DATE_REGEX_PATTERN.test(value)) {
    context.errors[property] =
      property + ' is not a valid date (e.g. 2018-06-12)';
  }
}

// module.exports = DateFormatValidator;
if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = DateFormatValidator;
  }
  exports.DateFormatValidator = DateFormatValidator;
}
else if (typeof root !== 'undefined') {
  root.DateFormatValidator = DateFormatValidator;
}
else {
  window.DateFormatValidator = DateFormatValidator;
}
