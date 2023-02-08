import Observable from '../framework/observable.js';
import { getRandomPoint, typesList, destinationsList, offersList } from '../mock/point.js';
import { getRandomPoints } from '../utils.js';

export default class PointsModel extends Observable {

  #points = [];
  #types = [];
  #destinations = [];
  #offers = [];

  constructor(points, types, destinations, offers) {
    super();
    this.#points = points || getRandomPoints(getRandomPoint);
    this.#types = types || [...typesList];
    this.#destinations = destinations || [...destinationsList];
    this.#offers = offers || [...offersList];
  }

  get points() {
    return this.#points;
  }

  updateTask(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
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
