const describedClass = require('../../../lib/components/SearchForm');

describe('SearchForm component', function () {
  let subject = new describedClass();

  describe('default props', function () {
    it('has internal props', function (done) {
      expect(subject.props).toEqual(jasmine.any(Object));
      done();
    });

    it('has internal findSearchResults function', function (done) {
      expect(subject.props.findSearchResults).toEqual(jasmine.any(Function));
      done();
    });
  });

  describe('functions', function () {
    it('render', function (done) {
      expect(subject.render()).toEqual(jasmine.any(Object));
      done();
    });

    it('render outerHTML', function (done) {
      expect(subject.render().outerHTML).toEqual(
        '<form id="search-form">' +
          '<div class="input-group">' +
            '<label for="from">From location</label>' +
            '<input type="text" name="from" value="">' +
          '</div>' +
          '<div class="input-group">' +
            '<label for="to">To location</label>' +
            '<input type="text" name="to" value="">' +
          '</div>' +
          '<div class="input-group">' +
            '<label for="travel_date">Travel date</label>' +
            '<input type="text" name="travel_date" value="">' +
          '</div>' +
          '<div class="input-group">' +
            '<input type="submit" value="Search">' +
          '</div>' +
        '</form>'
      );
      done();
    });

    it('_handleSubmit finds value from target component', function (done) {
      let result = [];
      // const find = jasmine.createSpy('find');
      const find = function (from, to, travel_date) {
        result = [from, to, travel_date];
      };

      // let submitEvent = jasmine.createSpyObj('submitEvent', ['preventDefault', 'target']);
      const preventDefault = jasmine.createSpy('preventDefault');
      const submitEvent = {
        preventDefault: preventDefault,
        target: {
          elements: {
            from: { value: 1 },
            to: { value: '2' },
            travel_date: { value: '2017-06-13' }
          }
        }
      };

      const submitSubject = new describedClass({ findSearchResults: find });
      submitSubject._handleSubmit(submitEvent);

      expect(result).toEqual([1, '2', '2017-06-13']);
      // expect(find).toHaveBeenCalled();
      expect(preventDefault).toHaveBeenCalled();
      done();
    });
  });
});
