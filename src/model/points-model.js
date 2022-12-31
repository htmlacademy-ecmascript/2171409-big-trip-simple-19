import { getRandomPoint, typesList, destinationsList, offersList } from '../mock/point.js';
import { getRandomPoints } from '../utils.js';

export default class PointsModel {

  #points = [];
  #types = [];
  #destinations = [];
  #offers = [];

  constructor(points, types, destinations, offers) {
    this.#points = points || getRandomPoints(getRandomPoint);
    this.#types = types || [...typesList];
    this.#destinations = destinations || [...destinationsList];
    this.#offers = offers || [...offersList];
  }

  get points() {
    return this.#points;
  }

  get types() {
    return this.#types;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }
}
