import ContentListView from '../view/content-list.js';
import NewPointView from '../view/point-new.js';
import EditPointView from '../view/point-edit.js';
import PointView from '../view/point.js';
import { render } from '../render.js';

export default class ContentPresenter {

  #contentComponent = new ContentListView();

  #boardPoints = [];

  constructor(siteHeaderElement, pointsModel, boardPoints, boardTypes, boardOffers, boardDestinations) {
    this.#siteHeaderElement = siteHeaderElement;
    this.#pointsModel = pointsModel;
    this.#boardPoints = boardPoints;
    this.#boardTypes = boardTypes;
    this.#boardOffers = boardOffers;
    this.#boardDestinations = boardDestinations;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#boardTypes = [...this.#pointsModel.types];
    this.#boardOffers = [...this.#pointsModel.offers];
    this.#boardDestinations = [...this.#pointsModel.destinations];

    render(this.#contentComponent, this.#siteHeaderElement);
    render(new NewPointView(), this.#contentComponent.element);
    render(new EditPointView({ point: this.#boardPoints[0], type: this.#boardTypes, offer: this.#boardOffers, destination: this.#boardDestinations }), this.#contentComponent.element);
    for (let i = 1; i < this.#boardPoints.length; i++) {
      render(new PointView({ point: this.#boardPoints[i] }), this.contentComponent.element);
    }
  }
}
