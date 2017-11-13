const describedClass = require('../../../lib/components/Tabs');

function DumbComponent(values) {
  if (values === 'undefined') { values = []; }
  this.values = values;
};

DumbComponent.prototype.render = function() {
  const self = this;
  var els = document.createElement('div');
  els.setAttribute('class', 'tab-outer')

  self.values.forEach(function (value) {
    var el = document.createElement('div');
    el.setAttribute('class', 'tab-inner')
    el.innerHTML = value;
    els.appendChild(el);
  });

  return els;
};

describe('Tabs component', function () {
  let subject = new describedClass();

  beforeEach(function () {
    // Cleanup `main` div within mock document
    document.getElementById('main').innerHTML = '';
  });

  describe('default props', function () {
    it('has internal props', function (done) {
      expect(subject.props).toEqual(jasmine.any(Object));
      done();
    });

    it('has internal defaultOpenIndex set to zero', function (done) {
      expect(subject.props.defaultOpenIndex).toEqual(0);
      done();
    });
  });

  describe('functions', function () {
    it('render', function (done) {
      expect(subject.render()).toEqual(jasmine.any(Object));
      done();
    });

    it('render outerHTML (with no content)', function (done) {
      expect(subject.render().outerHTML).toEqual(
        '<div>' +
          '<div class="tab"></div>' +
        '</div>'
      );
      done();
    });

    it('render outerHTML (with single piece of content)', function (done) {
      let _subject = new describedClass({
        content: {
          Monday: [new DumbComponent(['8:00'])]
        }
      });

      expect(_subject.render().outerHTML).toEqual(
        '<div>' +
          '<div class="tab">' +
            '<button class="tablinks active" data-target-id="Monday">Monday</button>' +
          '</div>' +
          '<div id="Monday" class="tabcontent active" style="display: block;">' +
            '<div class="tab-outer">' +
              '<div class="tab-inner">8:00</div>' +
            '</div>' +
          '</div>' +
        '</div>'
      );
      done();
    });

    it('render outerHTML (with multiple pieces of content)', function (done) {
      let _subject = new describedClass({
        content: {
          Monday: [new DumbComponent(['8:00'])],
          Friday: [new DumbComponent(['20:00']), new DumbComponent(['24:00'])]
        }
      });

      expect(_subject.render().outerHTML).toEqual(
        '<div>' +
          '<div class="tab">' +
            '<button class="tablinks active" data-target-id="Friday">Friday</button>' +
            '<button class="tablinks" data-target-id="Monday">Monday</button>' +
          '</div>' +
          '<div id="Friday" class="tabcontent active" style="display: block;">' +
            '<div class="tab-outer">' +
              '<div class="tab-inner">20:00</div>' +
            '</div>' +
            '<div class="tab-outer">' +
              '<div class="tab-inner">24:00</div>' +
            '</div>' +
          '</div>' +
          '<div id="Monday" class="tabcontent">' +
            '<div class="tab-outer">' +
              '<div class="tab-inner">8:00</div>' +
            '</div>' +
          '</div>' +
        '</div>'
      );
      done();
    });

    it('render outerHTML (with multiple pieces of content and default open index 1)', function (done) {
      let _subject = new describedClass({
        content: {
          Tuesday: [new DumbComponent(['9:00'])],
          Wednesday: [new DumbComponent(['10:00']), new DumbComponent(['12:00'])]
        },
        defaultOpenIndex: 1
      });

      expect(_subject.render().outerHTML).toEqual(
        '<div>' +
          '<div class="tab">' +
            '<button class="tablinks" data-target-id="Tuesday">Tuesday</button>' +
            '<button class="tablinks active" data-target-id="Wednesday">Wednesday</button>' +
          '</div>' +
          '<div id="Tuesday" class="tabcontent">' +
            '<div class="tab-outer">' +
              '<div class="tab-inner">9:00</div>' +
            '</div>' +
          '</div>' +
          '<div id="Wednesday" class="tabcontent active" style="display: block;">' +
            '<div class="tab-outer">' +
              '<div class="tab-inner">10:00</div>' +
            '</div>' +
            '<div class="tab-outer">' +
              '<div class="tab-inner">12:00</div>' +
            '</div>' +
          '</div>' +
        '</div>'
      );
      done();
    });

    it('_handleClick switches to selected tab index', function (done) {
      const clickSubject = new describedClass({
        content: {
          Saturday: [new DumbComponent(['0:00'])],
          Sunday: [new DumbComponent(['1:00'])]
        },
        defaultOpenIndex: 0
      });
      const renderedSubject = clickSubject.render();

      // Required for document lookup used within `_handleClick`
      document.getElementById('main').appendChild(renderedSubject);

      // The "Sunday" Tab button
      const clickedHTMLNode = renderedSubject
        .getElementsByClassName('tab')[0].childNodes[1];

      // let clickEvent = jasmine.createSpyObj('clickEvent', ['preventDefault', 'target']);
      const preventDefault = jasmine.createSpy('preventDefault');
      const clickEvent = {
        preventDefault: preventDefault,
        currentTarget: clickedHTMLNode
      };

      expect(document.getElementById('main').innerHTML).toEqual(
        '<div>' +
          '<div class="tab">' +
            '<button class="tablinks active" data-target-id="Saturday">Saturday</button>' +
            '<button class="tablinks" data-target-id="Sunday">Sunday</button>' +
          '</div>' +
          '<div id="Saturday" class="tabcontent active" style="display: block;">' +
            '<div class="tab-outer">' +
              '<div class="tab-inner">0:00</div>' +
            '</div>' +
          '</div>' +
          '<div id="Sunday" class="tabcontent">' +
            '<div class="tab-outer">' +
              '<div class="tab-inner">1:00</div>' +
            '</div>' +
          '</div>' +
        '</div>'
      );

      clickSubject._handleClick(clickEvent);

      expect(document.getElementById('main').innerHTML).toEqual(
        '<div>' +
          '<div class="tab">' +
            '<button class="tablinks" data-target-id="Saturday">Saturday</button>' +
            '<button class="tablinks active" data-target-id="Sunday">Sunday</button>' +
          '</div>' +
          '<div id="Saturday" class="tabcontent" style="display: none;">' +
            '<div class="tab-outer">' +
              '<div class="tab-inner">0:00</div>' +
            '</div>' +
          '</div>' +
          '<div id="Sunday" class="tabcontent active" style="display: block;">' +
            '<div class="tab-outer">' +
              '<div class="tab-inner">1:00</div>' +
            '</div>' +
          '</div>' +
        '</div>'
      );

      expect(preventDefault).toHaveBeenCalled();
      done();
    });
  });
});
