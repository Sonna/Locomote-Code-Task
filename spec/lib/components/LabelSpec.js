const describedClass = require('../../../lib/components/Label');

describe('Label component', function () {
  describe('properties', function () {
    const subject = new describedClass();

    it('for', function(done) {
      expect(subject.props.for).toEqual(jasmine.any(String));
      done();
    });

    it('content', function(done) {
      expect(subject.props.content).toEqual(jasmine.any(String));
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
        '<label for=""></label>'
      );
      done();
    });

    it('render label with "for" attribute', function (done) {
      const forSubject = new describedClass({ for: 'foo' });
      expect(forSubject.render().outerHTML).toEqual(
        '<label for="foo"></label>'
      );
      done();
    });

    it('render label with "content"', function (done) {
      const contentSubject = new describedClass({ content: 'Bar' });
      expect(contentSubject.render().outerHTML).toEqual(
        '<label for="">Bar</label>'
      );
      done();
    });

    it('render Label with "for" and "content"', function (done) {
      const labelSubject = new describedClass({
        for: 'name', content: 'Full Name'
      });

      expect(labelSubject.render().outerHTML).toEqual(
        '<label for="name">Full Name</label>'
      );
      done();
    });

    it('render required Label', function (done) {
      const requiredSubject = new describedClass({
        for: 'name', content: 'Full Name', required: true
      });

      expect(requiredSubject.render().outerHTML).toEqual(
        '<label for="name">' +
          'Full Name' +
          '<abbr title="required">*</abbr>' +
        '</label>'
      );
      done();
    });
  });
});
