const describedClass = require('../../../lib/components/Input');

describe('Input component', function () {
  describe('properties', function () {
    const subject = new describedClass();

    it('type', function(done) {
      expect(subject.props.type).toEqual('text');
      done();
    });

    it('name', function(done) {
      expect(subject.props.name).toEqual(jasmine.any(String));
      done();
    });

    it('value', function(done) {
      expect(subject.props.value).toEqual(jasmine.any(String));
      done();
    });

    it('placeholder', function(done) {
      expect(subject.props.placeholder).toEqual(jasmine.any(String));
      done();
    });

    it('required', function(done) {
      expect(subject.props.required).toEqual(jasmine.any(Boolean));
      done();
    });

    it('disabled', function(done) {
      expect(subject.props.disabled).toEqual(jasmine.any(Boolean));
      done();
    });
  });

  describe('functions', function () {
    const subject = new describedClass();

    it('render', function (done) {
      expect(subject.render()).toEqual(jasmine.any(Object));
      // expect(subject.render()).toEqual(jasmine.any(HTMLInputElement));
      done();
    });

    it('render default outerHTML', function (done) {
      expect(subject.render().outerHTML).toEqual(
        '<input type="text" name="" value="">'
      );
      done();
    });

    it('render submit input', function (done) {
      const submitSubject = new describedClass({
        type: 'submit', name: 'submit', value: 'Submit'
      });

      expect(submitSubject.render().outerHTML).toEqual(
        '<input type="submit" name="submit" value="Submit">'
      );
      done();
    });

    it('render placeholder input', function (done) {
      const placeholderSubject = new describedClass({
        type: 'text', name: 'name', placeholder: 'John Doe'
      });

      expect(placeholderSubject.render().outerHTML).toEqual(
        '<input type="text" name="name" value="" placeholder="John Doe">'
      );
      done();
    });

    it('render disabled input', function (done) {
      const disabledSubject = new describedClass({
        type: 'text', name: 'surname', value: 'Doe', disabled: true
      });

      expect(disabledSubject.render().outerHTML).toEqual(
        '<input type="text" name="surname" value="Doe" disabled="">'
      );
      done();
    });

    it('render required input', function (done) {
      const requiredSubject = new describedClass({
        type: 'text', name: 'firstname', value: 'John', required: true
      });

      expect(requiredSubject.render().outerHTML).toEqual(
        '<input type="text" name="firstname" value="John" required="">'
      );
      done();
    });
  });
});
