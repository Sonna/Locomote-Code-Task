const describedClass = require('../../../lib/components/Loader');

describe('Loader component', function () {
  describe('properties', function () {
    const subject = new describedClass();

    it('loading', function(done) {
      expect(subject.props.loading).toEqual(jasmine.any(Boolean));
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
        '<div id="loader" style="display: none;"></div>'
      );
      done();
    });

    it('render when loading', function (done) {
      const loadingSubject = new describedClass({ loading: true });
      expect(loadingSubject.render().outerHTML).toEqual(
        '<div id="loader" style="display: block;"></div>'
      );
      done();
    });
  });
});
