Tabs.prototype.props = {
  content: {
    // key: [value, values, ...]
  },
  defaultOpenIndex: 0
};

function Tabs(properties) {
  this.props = Object.assign({}, this.props, properties);
};

Tabs.prototype.render = function () {
  // var keys = Object.keys(this.props.content);
  // var values = Object.values(this.props.content);
  var self = this;
  var el = document.createElement('div');
  var tabsEl = document.createElement('div');
  var tabsContentEl = document.createElement('div');

  tabsEl.innerHTML = '<div class="tab"></div>';
  tabsContentEl.innerHTML = '';

  // Object.keys(this.props.content).forEach(function (key, index) {
  Object.keys(this.props.content).sort().forEach(function (key, index) {
    // do something with this.props.content[key]
    var values = self.props.content[key];

    // Tab Button
    var tabButtonEl = document.createElement('button');
    tabButtonEl.addEventListener('click', self._handleClick.bind(self));
    tabButtonEl.setAttribute('class', 'tablinks');
    if (index === self.props.defaultOpenIndex) {
      // tabButtonEl.setAttribute('id', 'defaultOpen');
      tabButtonEl.setAttribute('class', 'tablinks active');
    }
    tabButtonEl.setAttribute('data-target-id', key);
    tabButtonEl.targetId = key;
    tabButtonEl.innerHTML = key;
    tabsEl.firstChild.appendChild(tabButtonEl);
    // console.log(tabButtonEl)
    // `<button class="tablinks" onclick="openCity(event, 'London')" id="defaultOpen">London</button>`

    // Tab Content
    tabsContentEl.innerHTML += `<div id="${ key }" class="tabcontent animate-bottom"></div>`;
    if (index === self.props.defaultOpenIndex) {
      tabsContentEl.lastChild.style.display = 'block';
      tabsContentEl.lastChild.className += ' active';
    }

    values.forEach(function (value) {
      tabsContentEl.lastChild.appendChild(value.render());
    });
      // `<div id="${ key }" class="tabcontent">` +
      //   values.map(function (value) { return value.render() }) +
      // `</div>`;
  });

  el.appendChild(tabsEl.firstChild);
  while (tabsContentEl.firstChild) { el.appendChild(tabsContentEl.firstChild) }

  return el;
};

Tabs.prototype._handleClick = function (event) {
  event.preventDefault();
  // var id = event.currentTarget.targetId;
  var id = event.currentTarget.getAttribute('data-target-id');
  var tablinks = document.getElementsByClassName('tablinks');
  var tabcontent = document.getElementsByClassName('tabcontent');

  // https://stackoverflow.com/questions/24266313/using-foreach-on-an-array-from-getelementsbyclassname-results-in-typeerror-und
  // Highlight active tablink, remove class from the rest
  [].forEach.call(tablinks, function (tablink) {
    tablink.className = tablink.className.replace(' active', '');
  });
  event.currentTarget.className += ' active';

  // Show active tabcontent, hide the rest
  [].forEach.call(tabcontent, function (tabcontent) {
    tabcontent.className = tabcontent.className.replace(' active', '');
    tabcontent.style.display = 'none';
  });
  document.getElementById(id).className += ' active';
  document.getElementById(id).style.display = 'block';
};

// module.exports = Tabs;
if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = Tabs;
  }
  exports.Tabs = Tabs;
}
else if (typeof root !== 'undefined') {
  root.Tabs = Tabs;
}
else {
  window.Tabs = Tabs;
}
