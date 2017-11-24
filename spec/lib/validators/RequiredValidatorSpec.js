const describedClass = require('../../../lib/validators/RequiredValidator');

describe('RequiredValidator validate', function () {
  const subject = new describedClass();

  let context = {
    errors: {}
  };
  const property = 'foo';

  const nilValue = null;
  const emptyValue = '';
  const wholeValue = 'bar';

  beforeEach(function () {
    // reset errors within context before each test
    context.errors = {};
  });

  it('returns false when value is missing', function (done) {
    describedClass.validate(context, property, nilValue);
    expect(context.errors[property])
      .toEqual('foo is required (cannot be blank)');
    expect(Object.keys(context.errors).length).not.toEqual(0);
    done();
  });

  it('returns false when value is empty', function (done) {
    describedClass.validate(context, property, emptyValue);
    expect(context.errors[property])
      .toEqual('foo is required (cannot be blank)');
    expect(Object.keys(context.errors).length).not.toEqual(0);
    done();
  });

  it('returns true when value is not empty', function (done) {
    describedClass.validate(context, property, wholeValue);
    expect(context.errors[property]).toEqual(undefined);
    expect(Object.keys(context.errors).length).toEqual(0);
    done();
  });
});
