const describedClass = require('../../../lib/components/SearchResult');

describe('SearchResult component', function () {
  let subject = new describedClass();

  describe('default props', function () {
    it('has internal props', function (done) {
      expect(subject.props).toEqual(jasmine.any(Object));
      done();
    });

    it('default props have default types', function (done) {
      expect(subject.props.key).toEqual(jasmine.any(String));
      expect(subject.props.airline).toEqual(jasmine.any(Object));
      expect(subject.props.airline.code).toEqual(jasmine.any(String));
      expect(subject.props.airline.name).toEqual(jasmine.any(String));

      expect(subject.props.flightNum).toEqual(jasmine.any(Number));

      expect(subject.props.start).toEqual(jasmine.any(Object));
      expect(subject.props.start.dateTime).toEqual(jasmine.any(String));
      expect(subject.props.start.airportCode).toEqual(jasmine.any(String));
      expect(subject.props.start.airportName).toEqual(jasmine.any(String));
      expect(subject.props.start.cityCode).toEqual(jasmine.any(String));
      expect(subject.props.start.cityName).toEqual(jasmine.any(String));
      expect(subject.props.start.countryCode).toEqual(jasmine.any(String));
      expect(subject.props.start.countryName).toEqual(jasmine.any(String));
      expect(subject.props.start.latitude).toEqual(jasmine.any(Number));
      expect(subject.props.start.longitude).toEqual(jasmine.any(Number));
      expect(subject.props.start.stateCode).toEqual(jasmine.any(String));
      expect(subject.props.start.timeZone).toEqual(jasmine.any(String));

      expect(subject.props.finish).toEqual(jasmine.any(Object));
      expect(subject.props.finish.dateTime).toEqual(jasmine.any(String));
      expect(subject.props.finish.airportCode).toEqual(jasmine.any(String));
      expect(subject.props.finish.airportName).toEqual(jasmine.any(String));
      expect(subject.props.finish.cityCode).toEqual(jasmine.any(String));
      expect(subject.props.finish.cityName).toEqual(jasmine.any(String));
      expect(subject.props.finish.countryCode).toEqual(jasmine.any(String));
      expect(subject.props.finish.countryName).toEqual(jasmine.any(String));
      expect(subject.props.finish.latitude).toEqual(jasmine.any(Number));
      expect(subject.props.finish.longitude).toEqual(jasmine.any(Number));
      expect(subject.props.finish.stateCode).toEqual(jasmine.any(String));
      expect(subject.props.finish.timeZone).toEqual(jasmine.any(String));

      expect(subject.props.plane).toEqual(jasmine.any(Object));
      expect(subject.props.plane.code).toEqual(jasmine.any(String));
      expect(subject.props.plane.shortName).toEqual(jasmine.any(String));
      expect(subject.props.plane.fullName).toEqual(jasmine.any(String));
      expect(subject.props.plane.manufacturer).toEqual(jasmine.any(String));
      expect(subject.props.plane.model).toEqual(jasmine.any(String));

      expect(subject.props.distance).toEqual(jasmine.any(Number));
      expect(subject.props.durationMin).toEqual(jasmine.any(Number));
      expect(subject.props.price).toEqual(jasmine.any(Number));
      done();
    });
  });

  describe('functions', function () {
    it('render', function (done) {
      expect(subject.render()).toEqual(jasmine.any(Object));
      done();
    });

    it('render default outerHTML', function (done) {
      expect(subject.render().outerHTML).toEqual(
        '<article id="">' +
          '<p>flightNum: 0</p>' +
          '<p>distance: 0</p>' +
          '<p>durationMin: 0</p>' +
          '<p>price: 0</p>' +
         '</article>'
      );
      done();
    });
  });
});
