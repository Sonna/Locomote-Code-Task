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
      const firstEl = {
        render: function() { return document.createTextNode('hello'); }};
      const lastEl = {
        render: function() { return document.createTextNode('world'); }};
      const twoPageSubject = new describedClass({
        per: 1,
        content: [firstEl, lastEl]
      });
      expect(twoPageSubject.render().outerHTML).toEqual(
        '<section class="pagination">' +
          '<div class="page" data-paginator-index="page-0" style="display: block;">hello</div>' +
          '<div class="page" data-paginator-index="page-1" style="display: none;">world</div>' +
          '<div class="paginator">' +
            '<button class="page-link active" data-paginator-index="0">1</button>' +
            '<button class="page-link" data-paginator-index="1">2</button>' +
            '<button class="page-link" data-paginator-index="1">›</button>' +
            '<button class="page-link" data-paginator-index="1">»</button>' +
          '</div>' +
        '</section>'
      );
      done();
    });

    it('render with 2 pages, 1 per page, last page', function (done) {
      const firstEl = {
        render: function() { return document.createTextNode('hello'); }};
      const lastEl = {
        render: function() { return document.createTextNode('world'); }};
      const twoPageSubject = new describedClass({
        per: 1,
        index: 1,
        content: [firstEl, lastEl]
      });
      expect(twoPageSubject.render().outerHTML).toEqual(
        '<section class="pagination">' +
          '<div class="page" data-paginator-index="page-0" style="display: none;">hello</div>' +
          '<div class="page" data-paginator-index="page-1" style="display: block;">world</div>' +
          '<div class="paginator">' +
            '<button class="page-link" data-paginator-index="0">«</button>' +
            '<button class="page-link" data-paginator-index="0">‹</button>' +
            '<button class="page-link" data-paginator-index="0">1</button>' +
            '<button class="page-link active" data-paginator-index="1">2</button>' +
          '</div>' +
        '</section>'
      );
      done();
    });

    it('render with 3 pages in middle of pages', function (done) {
      const firstEl = {
        render: function() { return document.createTextNode('hello'); }};
      const middleEl = {
        render: function() { return document.createTextNode('foobar'); }};
      const lastEl = {
        render: function() { return document.createTextNode('world'); }};
      const twoPageSubject = new describedClass({
        per: 1,
        index: 1,
        content: [firstEl, middleEl, lastEl]
      });
      expect(twoPageSubject.render().outerHTML).toEqual(
        '<section class="pagination">' +
          '<div class="page" data-paginator-index="page-0" style="display: none;">hello</div>' +
          '<div class="page" data-paginator-index="page-1" style="display: block;">foobar</div>' +
          '<div class="page" data-paginator-index="page-2" style="display: none;">world</div>' +
          '<div class="paginator">' +
            '<button class="page-link" data-paginator-index="0">«</button>' +
            '<button class="page-link" data-paginator-index="0">‹</button>' +
            '<button class="page-link" data-paginator-index="0">1</button>' +
            '<button class="page-link active" data-paginator-index="1">2</button>' +
            '<button class="page-link" data-paginator-index="2">3</button>' +
            '<button class="page-link" data-paginator-index="2">›</button>' +
            '<button class="page-link" data-paginator-index="2">»</button>' +
          '</div>' +
        '</section>'
      );
      done();
    });
  });
});
