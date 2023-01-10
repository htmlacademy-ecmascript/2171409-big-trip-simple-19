import ContentListView from '../view/content-list.js';
import EditPointView from '../view/point-edit.js';
import PointView from '../view/point.js';
import { render } from '../render.js';
import FilterView from '../view/filter.js';
import SortView from '../view/sort.js';
import FirstPointView from '../view/list-empty.js';

export default class ContentPresenter {

  #siteEventElement = null;
  #siteBodyElement = null;
  #pointsModel = null;
  #contentComponent = new ContentListView();
  #boardPoints = [];

  constructor(siteEventElement, pointsModel, boardPoints, siteBodyElement) {
    this.#siteEventElement = siteEventElement;
    this.#siteBodyElement = siteBodyElement;
    this.#pointsModel = pointsModel;
    this.#boardPoints = boardPoints;
  }

  init() {
    render(new FilterView(), this.#siteBodyElement);


    this.#boardPoints = [...this.#pointsModel.points];

    if (this.#boardPoints.every((point) => point.id)) {
      render(new SortView(), this.#siteEventElement);
      render(this.#contentComponent, this.#siteEventElement);
      for (let i = 1; i < this.#boardPoints.length; i++) {
        this.#renderPoint(this.#boardPoints[i]);
      }
    } else {
      render(new FirstPointView(), this.#siteEventElement);
    }
  }

  #renderPoint(point) {
    const pointComponent = new PointView({ point });
    const pointEditComponent = new EditPointView({ point });

    const replaceFormToCard = () => {
      this.#contentComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceCardToForm = () => {
      this.#contentComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceCardToForm();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      replaceCardToForm();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToCard();
      document.addEventListener('keydown', escKeyDownHandler);
    });

    pointEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceCardToForm();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    render(pointComponent, this.#contentComponent.element);
  }
}
