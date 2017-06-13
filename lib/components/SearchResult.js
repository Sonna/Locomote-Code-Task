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
  var article = document.createElement('article');
  article.setAttribute('id', this.props.key);

  var flightNumEl = document.createElement('p');
  flightNumEl.innerHTML = `flightNum: ${ this.props.flightNum }`;
  article.appendChild(flightNumEl);

  var distanceEl = document.createElement('p');
  distanceEl.innerHTML = `distance: ${ this.props.distance }`;
  article.appendChild(distanceEl);

  var durationMinEl = document.createElement('p');
  durationMinEl.innerHTML = `durationMin: ${ this.props.durationMin }`;
  article.appendChild(durationMinEl);

  var priceEl = document.createElement('p');
  priceEl.innerHTML = `price: ${ this.props.price }`;
  article.appendChild(priceEl);

  return article;
  // return(
  //   `<article id="${ this.props.key }">
  //     <p>flightNum: ${ this.props.flightNum }</p>
  //     <p>distance: ${ this.props.distance }</p>
  //     <p>durationMin: ${ this.props.durationMin }</p>
  //     <p>price: ${ this.props.price }</p>
  //    </article>`
  // );
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
