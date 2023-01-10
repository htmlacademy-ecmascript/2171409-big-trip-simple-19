import { render, replace } from '../framework/render.js';
import ContentListView from '../view/content-list.js';
import EditPointView from '../view/point-edit.js';
import PointView from '../view/point.js';
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

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceCardToForm.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointEditComponent = new EditPointView({
      point,
      onEditClick: () => {
        replaceCardToForm.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onFormSubmit: () => {
        replaceCardToForm.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointComponent = new PointView({
      point,
      onEditClick: () => {
        replaceFormToCard.call(this);
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceFormToCard() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceCardToForm() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#contentComponent.element);
  }
}
