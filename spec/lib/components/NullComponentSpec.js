const describedClass = require('../../../lib/components/NullComponent');

describe('NullComponent component', function () {
  let subject = new describedClass();

  describe('functions', function () {
    it('render', function (done) {
      expect(subject.render()).toEqual(jasmine.any(Object));
      done();
    });

    it('render default outerHTML', function (done) {
      expect(subject.render().outerHTML).toEqual(
        '<div></div>'
      );
      done();
    });
  });
});
