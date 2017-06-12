const describedClass = require('../../../lib/components/SearchForm');

describe('SearchForm component', function () {
  let subject = new describedClass();

  describe('default state', function () {
    it('has internal state', function (done) {
      expect(subject.state).toEqual(jasmine.any(Object));
      done();
    });
  });

  describe('functions', function () {
    it('render', function (done) {
      expect(subject.render()).toEqual('<form id="search"></form>');
      done();
    });
  });
});
