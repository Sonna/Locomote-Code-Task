// == References:
// - [javascript \- Convert a 1D array to 2D array \- Stack Overflow]
//   (https://stackoverflow.com/questions/22464605/convert-a-1d-array-to-2d-array)

Paginator.prototype.props = {
  // this.handleClick: function (index) {},

  index: 0,
  per: 10,
  content: []
  // pages: ['']
};

function Paginator(properties) {
  this.props = Object.assign({}, this.props, properties);
  // this.handleClick = function (index) {};
};

Paginator.prototype.render = function () {
  var self = this;
  var el = document.createElement('section');
  el.setAttribute('class', 'pagination');

  // Splice content into pages per page
  var pages = [];
  while(self.props.content.length) {
    pages.push(self.props.content.splice(0, self.props.per));
  }

  // Create each page, show current index, hide rest
  pages.forEach(function(page, i) {
    var pageEl = document.createElement('div');
    pageEl.setAttribute('class', 'page');
    pageEl.style.display = (i === self.props.index ? 'block' : 'none');
    pageEl.innerHTML = page;
    el.appendChild(pageEl);
  })

  if (pages.length > 1) {
    // Render paginator links
    var paginatorEl = document.createElement('div');
    paginatorEl.setAttribute('class', 'paginator');

    var linkElTemplate = document.createElement('a');
    linkElTemplate.setAttribute('href', '#');

    // Add Previous & First page links, if not start of paginator
    if (self.props.index !== 0) {
      var firstPagelinkEl = linkElTemplate.cloneNode(true);
      var firstPagelinkText = document.createTextNode('«');
      firstPagelinkEl.appendChild(firstPagelinkText);
      paginatorEl.appendChild(firstPagelinkEl);

      var prevPagelinkEl = linkElTemplate.cloneNode(true);
      var prevPagelinkText = document.createTextNode('‹');
      prevPagelinkEl.appendChild(prevPagelinkText);
      paginatorEl.appendChild(prevPagelinkEl);
    }

    pages.forEach(function(_page, i) {
      var linkEl = linkElTemplate.cloneNode(true);
      var linkText = document.createTextNode(i + 1);
      linkEl.appendChild(linkText);

      if (i === self.props.index) {
        linkEl.setAttribute('class', 'active');
      }

      linkEl.addEventListener('click', self._handleClick.bind(self))
      paginatorEl.appendChild(linkEl);
    });

    // Add Next & Last page links, if not end of paginator
    if (self.props.index !== (pages.length - 1)) {
      var nextPagelinkEl = linkElTemplate.cloneNode(true);
      var nextPagelinkText = document.createTextNode('›');
      nextPagelinkEl.appendChild(nextPagelinkText);
      paginatorEl.appendChild(nextPagelinkEl);

      var lastPagelinkEl = linkElTemplate.cloneNode(true);
      var lastPagelinkText = document.createTextNode('»');
      lastPagelinkEl.appendChild(lastPagelinkText);
      paginatorEl.appendChild(lastPagelinkEl);
    }

    el.appendChild(paginatorEl);
  }

  return el;
  // <div class="pagination">
  //   <a href="#">&laquo;</a>
  //   <a href="#">&lsaquo;</a>
  //   <a href="#">1</a>
  //   <a class="active" href="#">2</a>
  //   <a href="#">3</a>
  //   <a href="#">4</a>
  //   <a href="#">5</a>
  //   <span>...</span>
  //   <a href="#">10</a>
  //   <a href="#">&rsaquo;</a>
  //   <a href="#">&raquo;</a>
  // </div>
};

Paginator.prototype._handleClick = function (event) {
  event.preventDefault();
  var linkEl = event.target;
  console.log(linkEl);
  var index = linkEl.value;
  this.props.handleClick(index);
};

// module.exports = Paginator;
if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = Paginator;
  }
  exports.Paginator = Paginator;
}
else if (typeof root !== 'undefined') {
  root.Paginator = Paginator;
}
else {
  window.Paginator = Paginator;
}
