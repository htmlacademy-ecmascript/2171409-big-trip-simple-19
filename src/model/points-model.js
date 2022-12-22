import { getRandomPoint, typesList, destinationsList, offersList } from '../mock/point.js';
import { AMOUNT_ITEMS } from '../const.js';

export default class PointsModel {
  points = Array.from({ length: AMOUNT_ITEMS }, getRandomPoint);
  types = Array.from(typesList);
  destinations = Array.from(destinationsList);
  offers = Array.from(offersList);

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
