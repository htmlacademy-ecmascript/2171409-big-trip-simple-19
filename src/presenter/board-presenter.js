import ContentListView from '../view/content-list.js';
import EditPointView from '../view/point-edit.js';
import PointView from '../view/point.js';
import { render } from '../render.js';

export default class ContentPresenter {
  #siteHeaderElement = null;
  #pointsModel = null;
  #contentComponent = new ContentListView();
  #boardPoints = [];

  constructor(siteHeaderElement, pointsModel, boardPoints) {
    this.#siteHeaderElement = siteHeaderElement;
    this.#pointsModel = pointsModel;
    this.#boardPoints = boardPoints;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];

    render(this.#contentComponent, this.#siteHeaderElement);
    for (let i = 1; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i]);
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

    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click',(evt)=>{
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
