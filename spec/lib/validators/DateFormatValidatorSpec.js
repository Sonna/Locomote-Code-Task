const describedClass = require('../../../lib/validators/DateFormatValidator');

describe('DateFormatValidator validate', function () {
  const subject = new describedClass();

  let context = {
    errors: {}
  };
  const property = 'date';

  const nilValue = null;
  const emptyValue = '';
  const invalidFormatDateValue = '25-12-2017';
  const invalidYearDateValue = '1817-12-25';
  const invalidMonthDateValue = '2004-32-01';
  const invalidDayDateValue = '2010-01-42';
  const validDateValue = '2017-12-25';

  beforeEach(function () {
    // reset errors within context before each test
    context.errors = {};
  });

  it('adds error messages when value is missing', function (done) {
    describedClass.validate(context, property, nilValue);
    expect(context.errors[property])
      .toEqual('date is not a valid date (e.g. 2018-06-12)');
    expect(Object.keys(context.errors).length).not.toEqual(0);
    done();
  });

  it('adds error messages when value is empty', function (done) {
    describedClass.validate(context, property, emptyValue);
    expect(context.errors[property])
      .toEqual('date is not a valid date (e.g. 2018-06-12)');
    expect(Object.keys(context.errors).length).not.toEqual(0);
    done();
  });

  it('invalid date format; e.g. 13-12-2011', function (done) {
    describedClass.validate(context, property, invalidFormatDateValue);
    expect(context.errors[property])
      .toEqual('date is not a valid date (e.g. 2018-06-12)');
    expect(Object.keys(context.errors).length).not.toEqual(0);
    done();
  });

  it('invalid year date', function (done) {
    describedClass.validate(context, property, invalidYearDateValue);
    expect(context.errors[property])
      .toEqual('date is not a valid date (e.g. 2018-06-12)');
    expect(Object.keys(context.errors).length).not.toEqual(0);
    done();
  });

  it('invalid month date', function (done) {
    describedClass.validate(context, property, invalidMonthDateValue);
    expect(context.errors[property])
      .toEqual('date is not a valid date (e.g. 2018-06-12)');
    expect(Object.keys(context.errors).length).not.toEqual(0);
    done();
  });

  it('invalid day date', function (done) {
    describedClass.validate(context, property, invalidDayDateValue);
    expect(context.errors[property])
      .toEqual('date is not a valid date (e.g. 2018-06-12)');
    expect(Object.keys(context.errors).length).not.toEqual(0);
    done();
  });

  it('no error messages when value is correctly formatted', function (done) {
    describedClass.validate(context, property, validDateValue);
    expect(context.errors[property]).toEqual(undefined);
    expect(Object.keys(context.errors).length).toEqual(0);
    done();
  });
});
