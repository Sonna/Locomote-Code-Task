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
  var startDate = new Date(this.props.start.dateTime);
  var finishDate = new Date(this.props.finish.dateTime);

  var durationFormatted = '';
  var durationHour = this.props.durationMin / 60;
  var durationRemainingMinutes = this.props.durationMin % 60;

  if (durationHour > 1) {
    durationFormatted =
     `${ Math.round(durationHour) }<abbr title="hours">h</abbr> : `;
  };
  durationFormatted +=
    `${ durationRemainingMinutes }<abbr title="minutes">min</abbr>`;

  var distanceFormatted = '';
  var distanceKM = this.props.distance / 1000;
  var distanceRemainingM = this.props.distance % 1000;

  if (distanceKM > 1) {
    distanceFormatted =
     `${ Math.round(distanceKM) }<abbr title="kilometers">km</abbr> `;
  };
  distanceFormatted +=
    `${ distanceRemainingM }<abbr title="meters">m</abbr>`;

  var el = document.createElement('div');
  el.setAttribute('id', this.props.key);

  el.innerHTML =
    `<article id="${ this.props.key }" class="flight search-result">` +
      `<section class="start">` +
        `<time class="datetime" datetime="${ this.props.start.dateTime }">` +
          `<span class="time">` +
            `${ startDate.toUTCString().slice(17, 22) }` +
            `<span class="period">${ (finishDate.getHours >= 12) ? "PM" : "AM" }</span>` +
          `</span>` +
          `<span class="date">${ startDate.toUTCString().slice( 0, 11) }</span>` +
        `</time>` +
      `</section>` +

      `<section class="journey">` +
        `<div class="journey-top">` +
          `<span class="journey-stop-icon"></span>` +
          `<span class="journey-stop-line"></span>` +
          `<span class="journey-stop-icon">` +
            // `<svg class="placeIcon-0-134" viewBox="0 0 24 24" style="display: inline-block; color: rgb(0, 114, 234); fill: currentcolor; height: 24px; width: 24px; user-select: none; transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></svg>` +
          `</span>` +
        `</div>` +
        `<div class="journey-bottom">` +
          `<span class="airport start">` +
            `<abbr title="${ this.props.start.airportName }">${ this.props.start.airportCode }</abbr>` +
          `</span>` +
          `<span class="journey-details">` +
            `<span class="duration-minimum">` +
              `${ durationFormatted }` +
            `</span>` +
            `<span class="divider"> / </span>` +
            `<span class="distance">` +
              `${ distanceFormatted }` +
            `</span>` +
          `</span>` +
          `<span class="airport finish">` +
            `<abbr title="${ this.props.finish.airportName }">${ this.props.finish.airportCode }</abbr>` +
          `</span>` +
        `</div>` +
      `</section>` +

      `<section class="finish">` +
        `<time class="datetime" datetime="${ this.props.finish.dateTime }">` +
          `<span class="time">` +
            `${ finishDate.toUTCString().slice(17, 22) }` +
            `<span class="period">${ (finishDate.getHours >= 12) ? "PM" : "AM" }</span>` +
          `</span>` +
          `<span class="date">${ finishDate.toUTCString().slice( 0, 11) }</span>` +
        `</time>` +
      `</section>` +

      `<section class="flight-details">` +
        `<span class="flight-num">` +
          `<abbr title="${ this.props.airline.name }">${ this.props.airline.code }</abbr>` +
          `<span>${ this.props.flightNum }</span>` +
        `</span>` +
      `</section>` +

      `<section class="fare">` +
        `<a href="#" class="button">` +
          `<span class="currency-symbol">$</span>` +
          `<span class="price">${ this.props.price.toFixed(2) }</span>` +
        `</a>` +
      `</section>` +
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
