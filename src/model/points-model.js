import { getRandomPoint, typesList, destinationsList, offersList } from '../mock/point.js';
import { getRandomPoints } from '../utils.js';

export default class PointsModel {
  constructor(points = getRandomPoints(getRandomPoint), types = [...typesList], destinations = [...destinationsList], offers = [...offersList]) {
    this.points = points;
    this.types = types;
    this.destinations = destinations;
    this.offers = offers;
  }

  getPoints() {
    return this.points;
  }

  getTypes() {
    return this.types;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }
}
