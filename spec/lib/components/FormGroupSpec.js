const describedClass = require('../../../lib/components/FormGroup');

describe('FormGroup component', function () {
  describe('properties', function () {
    const subject = new describedClass();

    it('label', function(done) {
      expect(subject.props.label).toEqual(jasmine.any(Object));
      done();
    });

    it('input', function(done) {
      expect(subject.props.input).toEqual(jasmine.any(Object));
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
        '<div class="input-group"></div>'
      );
      done();
    });

    it('render with Label', function (done) {
      const labelSubject = new describedClass({
        label: { for: 'name', content: 'Full Name' }
      });

      expect(labelSubject.render().outerHTML).toEqual(
        '<div class="input-group">' +
          '<label for="name">Full Name</label>' +
        '</div>'
      );
      done();
    });

    it('render with Input', function (done) {
      const labelSubject = new describedClass({
        input: {
          type: 'text',
          name: 'firstname',
          value: 'John',
          required: true
        }
      });

      expect(labelSubject.render().outerHTML).toEqual(
        '<div class="input-group">' +
          '<input type="text" name="firstname" value="John" required="">' +
        '</div>'
      );
      done();
    });

    it('render with Label and Input', function (done) {
      const labelSubject = new describedClass({
        label: { for: 'surname', content: 'Last Name' },
        input: {
          type: 'text',
          name: 'surname',
          value: 'Doe',
          disabled: true
        }
      });

      expect(labelSubject.render().outerHTML).toEqual(
        '<div class="input-group">' +
          '<label for="surname">Last Name</label>' +
          '<input type="text" name="surname" value="Doe" disabled="">' +
        '</div>'
      );
      done();
    });
  });
});
