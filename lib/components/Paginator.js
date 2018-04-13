// == References:
// - [javascript \- Convert a 1D array to 2D array \- Stack Overflow]
//   (https://stackoverflow.com/questions/22464605/convert-a-1d-array-to-2d-array)
var RADIX = 10;

Paginator.prototype.props = {
  // handleClick: function (index) {},

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
  var index = parseInt(self.props.index, RADIX);
  var el = document.createElement('section');
  el.setAttribute('class', 'pagination');

  // Splice content into pages per page
  var pages = [];
  while(self.props.content.length) {
    pages.push(self.props.content.splice(0, self.props.per));
  }

  // Create each page, show current index, hide rest
  pages.forEach(function(page, i) {
    var renderedEls = Array.isArray(page) ? page : Array(page);
    var pageEl = document.createElement('div');
    // pageEl.setAttribute('id', `page`);
    pageEl.setAttribute('class', 'page');
    pageEl.setAttribute('data-paginator-index', `page-${i}`);
    pageEl.style.display = (i === index ? 'block' : 'none');
    // pageEl.appendChild(page.render());
    renderedEls.forEach(function (renderedEl) {
      pageEl.appendChild(renderedEl.render());
    });
    // pageEl.innerHTML = page;
    el.appendChild(pageEl);
  })

  if (pages.length > 1) {
    // Render paginator links
    var paginatorEl = document.createElement('div');
    paginatorEl.setAttribute('class', 'paginator');

    // var linkElTemplate = document.createElement('a');
    // linkElTemplate.setAttribute('href', '#');
    var linkElTemplate = document.createElement('button');
    linkElTemplate.setAttribute('class', 'page-link');
    linkElTemplate.addEventListener('click', self._handleClick.bind(self));
    // linkElTemplate.addEventListener('onclick', self._handleClick.bind(self));

    // Add Previous & First page links, if not start of paginator
    if (index !== 0) {
      var firstPagelinkEl = linkElTemplate.cloneNode(true);
      firstPagelinkEl.setAttribute('data-paginator-index', 0);
      firstPagelinkEl.addEventListener('click', self._handleClick.bind(self));
      var firstPagelinkText = document.createTextNode('«');
      firstPagelinkEl.appendChild(firstPagelinkText);
      paginatorEl.appendChild(firstPagelinkEl);

      var prevPagelinkEl = linkElTemplate.cloneNode(true);
      prevPagelinkEl.setAttribute('data-paginator-index', index - 1);
      prevPagelinkEl.addEventListener('click', self._handleClick.bind(self));
      var prevPagelinkText = document.createTextNode('‹');
      prevPagelinkEl.appendChild(prevPagelinkText);
      paginatorEl.appendChild(prevPagelinkEl);
    }

    pages.forEach(function(_page, i) {
      // var linkEl = linkElTemplate.cloneNode(true);
      var linkEl = document.createElement('button');
      linkEl.setAttribute('class', 'page-link');
      linkEl.setAttribute('data-paginator-index', i);
      var linkText = document.createTextNode(i + 1);
      linkEl.appendChild(linkText);

      if (i === index) {
        // linkEl.setAttribute('class', 'active');
        linkEl.className += ' active';
      }

      linkEl.addEventListener('click', self._handleClick.bind(self));
      // console.log(linkEl.eventListeners);
      paginatorEl.appendChild(linkEl);
    });

    // Add Next & Last page links, if not end of paginator
    var lastPageIndex = (pages.length - 1);
    if (index !== lastPageIndex) {
      var nextPagelinkEl = linkElTemplate.cloneNode(true);
      nextPagelinkEl.setAttribute('data-paginator-index', index + 1);
      nextPagelinkEl.addEventListener('click', self._handleClick.bind(self));
      var nextPagelinkText = document.createTextNode('›');
      nextPagelinkEl.appendChild(nextPagelinkText);
      paginatorEl.appendChild(nextPagelinkEl);

      var lastPagelinkEl = linkElTemplate.cloneNode(true);
      lastPagelinkEl.setAttribute('data-paginator-index', lastPageIndex);
      lastPagelinkEl.addEventListener('click', self._handleClick.bind(self));
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
  // console.log(event);
  event.preventDefault();
  // var linkEl = event.srcElement;
  // var linkEl = event.target;
  // console.log(linkEl);
  // var index = linkEl.innerText;
  // var index = linkEl.getAttribute('data-paginator-index');
  var index = event.currentTarget.getAttribute('data-paginator-index');
  console.log(index);
  this.props.handleClick(index);

  // event.preventDefault();
  // // var id = event.currentTarget.targetId;
  // var id = event.currentTarget.getAttribute('data-paginator-index');
  // var pagesLinks = document.getElementsByClassName('page-link');
  // var pagesContents = document.getElementsByClassName('page');

  // // https://stackoverflow.com/questions/24266313/using-foreach-on-an-array-from-getelementsbyclassname-results-in-typeerror-und
  // // Highlight active tablink, remove class from the rest
  // [].forEach.call(pagesLinks, function (pagesLink) {
  //   pagesLink.className = pagesLink.className.replace(' active', '');
  // });
  // event.currentTarget.className += ' active';

  // // Show active pagesContent, hide the rest
  // [].forEach.call(pagesContents, function (pagesContent) {
  //   pagesContent.className = pagesContent.className.replace(' active', '');
  //   pagesContent.style.display = 'none';
  // });
  // document.querySelector(`div.page[data-paginator-index="page-${id}"]`).className += ' active';
  // document.querySelector(`div.page[data-paginator-index="page-${id}"]`).style.display = 'block';
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
