const describedClass = require('../../../lib/components/FormErrors');

describe('FormErrors component', function () {
  describe('properties', function () {
    const subject = new describedClass();

    it('errors', function(done) {
      expect(subject.props.errors).toEqual(jasmine.any(Object));
      done();
    });
  });

  describe('functions', function () {
    const subject = new describedClass();

    it('render', function (done) {
      expect(subject.render()).toEqual(jasmine.any(Object));
      done();
    });

    it('render default outerHTML', function (done) {
      expect(subject.render().outerHTML).toEqual(
        '<ul class="form-errors"></ul>'
      );
      done();
    });
  });

  describe('render with error messages', function () {
    let subject = new describedClass({
      errors: {
        foo: 'foo is required (cannot be blank)',
        badDate: 'badDate is malformed (should be like 2017-12-25)'
      }
    });

    it('render default outerHTML', function (done) {
      expect(subject.render().outerHTML).toEqual(
        '<ul class="form-errors">' +
          '<li>foo is required (cannot be blank)</li>' +
          '<li>badDate is malformed (should be like 2017-12-25)</li>' +
        '</ul>'
      );
      done();
    });
  });
});
