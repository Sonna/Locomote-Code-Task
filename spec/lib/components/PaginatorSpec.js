const describedClass = require('../../../lib/components/Paginator');

describe('Paginator component', function () {
  describe('properties', function () {
    const subject = new describedClass();

    it('index', function(done) {
      expect(subject.props.index).toEqual(jasmine.any(Number));
      done();
    });

    it('per', function(done) {
      expect(subject.props.per).toEqual(jasmine.any(Number));
      done();
    });

    it('content', function(done) {
      expect(subject.props.content).toEqual(jasmine.any(Array));
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
        '<section class="pagination"></section>'
      );
      done();
    });

    it('render with 2 pages, 1 per page, first page', function (done) {
      const firstEl = 'hello';
      const lastEl = 'world';
      const twoPageSubject = new describedClass({
        per: 1,
        content: [firstEl, lastEl]
      });
      expect(twoPageSubject.render().outerHTML).toEqual(
        '<section class="pagination">' +
          '<div class="page" style="display: block;">hello</div>' +
          '<div class="page" style="display: none;">world</div>' +
          '<div class="paginator">' +
            '<a href="#" class="active">1</a>' +
            '<a href="#">2</a>' +
            '<a href="#">›</a>' +
            '<a href="#">»</a>' +
          '</div>' +
        '</section>'
      );
      done();
    });

    it('render with 2 pages, 1 per page, last page', function (done) {
      const firstEl = 'hello';
      const lastEl = 'world';
      const twoPageSubject = new describedClass({
        per: 1,
        index: 1,
        content: [firstEl, lastEl]
      });
      expect(twoPageSubject.render().outerHTML).toEqual(
        '<section class="pagination">' +
          '<div class="page" style="display: none;">hello</div>' +
          '<div class="page" style="display: block;">world</div>' +
          '<div class="paginator">' +
            '<a href="#">«</a>' +
            '<a href="#">‹</a>' +
            '<a href="#">1</a>' +
            '<a href="#" class="active">2</a>' +
          '</div>' +
        '</section>'
      );
      done();
    });

    it('render with 3 pages in middle of pages', function (done) {
      const firstEl = 'hello';
      const middleEl = 'foobar';
      const lastEl = 'world';
      const twoPageSubject = new describedClass({
        per: 1,
        index: 1,
        content: [firstEl, middleEl, lastEl]
      });
      expect(twoPageSubject.render().outerHTML).toEqual(
        '<section class="pagination">' +
          '<div class="page" style="display: none;">hello</div>' +
          '<div class="page" style="display: block;">foobar</div>' +
          '<div class="page" style="display: none;">world</div>' +
          '<div class="paginator">' +
            '<a href="#">«</a>' +
            '<a href="#">‹</a>' +
            '<a href="#">1</a>' +
            '<a href="#" class="active">2</a>' +
            '<a href="#">3</a>' +
            '<a href="#">›</a>' +
            '<a href="#">»</a>' +
          '</div>' +
        '</section>'
      );
      done();
    });
  });
});
