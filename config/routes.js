const ROOT_DIR = '..';

const AirlineController = require(ROOT_DIR + '/app/controllers/AirlineController');
const AirportController = require(ROOT_DIR + '/app/controllers/AirportController');
const SearchController = require(ROOT_DIR + '/app/controllers/SearchController');

const routes = {
  '/airlines': AirlineController.airlineList,
  '/airports': AirportController.airportList,
  '/search': SearchController.searchCreate
}

module.exports = routes;
