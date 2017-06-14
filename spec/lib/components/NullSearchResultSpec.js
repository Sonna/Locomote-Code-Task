const describedClass = require('../../../lib/components/NullSearchResult');

describe('NullSearchResult component', function () {
  let subject = new describedClass();

  describe('functions', function () {
    it('render', function (done) {
      expect(subject.render()).toEqual(jasmine.any(Object));
      done();
    });

    it('render default outerHTML', function (done) {
      expect(subject.render().outerHTML).toEqual(
        '<article id="null-search-result">' +
          '<h2 class="">No flights found</h2>' +
         '</article>'
      );
      done();
    });
  });
});
