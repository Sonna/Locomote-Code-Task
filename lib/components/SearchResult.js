SearchResult.prototype.props = {
  key: "",
  airline: {
    code: "",
    name: ""
  },
  flightNum: 0,
  start: {
    dateTime: "", // "2018-09-02T23:58:00+10:00",
    airportCode: "",
    airportName: "",
    cityCode: "",
    cityName: "",
    countryCode: "",
    countryName: "",
    latitude: 0.0,
    longitude: 0.0,
    stateCode: "",
    timeZone: ""
  },
  finish: {
    dateTime: "",
    airportCode: "",
    airportName: "",
    cityCode: "",
    cityName: "",
    countryCode: "",
    countryName: "",
    latitude: 0.0,
    longitude: 0.0,
    stateCode: "",
    timeZone: ""
  },
  plane: {
    code: "",
    shortName: "",
    fullName: "",
    manufacturer: "",
    model: ""
  },
  distance: 0,
  durationMin: 0,
  price: 0.0
};

function SearchResult(properties) {
  this.props = Object.assign({}, this.props, properties);
};

SearchResult.prototype.render = function () {
  var el = document.createElement('div');
  el.setAttribute('id', this.props.key);

  el.innerHTML =
    `<article id="${ this.props.key }">` +
      `<p>flightNum: ${ this.props.flightNum }</p>` +
      `<p>distance: ${ this.props.distance }</p>` +
      `<p>durationMin: ${ this.props.durationMin }</p>` +
      `<p>price: ${ this.props.price }</p>` +
    `</article>`;

  return el.firstChild;
};

// module.exports = SearchResult;
if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = SearchResult;
  }
  exports.SearchResult = SearchResult;
}
else if (typeof root !== 'undefined') {
  root.SearchResult = SearchResult;
}
else {
  window.SearchResult = SearchResult;
}
