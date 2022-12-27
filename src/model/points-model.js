import { getRandomPoint, typesList, destinationsList, offersList } from '../mock/point.js';
import { getRandomPoints } from '../utils.js';

export default class PointsModel {
  
  constructor(points, types, destinations, offers) {
    this.#points = points;
    this.#types = types;
    this.#destinations = destinations;
    this.#offers = offers;
  }
  
  #points = getRandomPoints(getRandomPoint);
  #types = [...typesList];
  #destinations = [...destinationsList];
  #offers = [...offersList];

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
