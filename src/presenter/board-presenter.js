import { render, RenderPosition } from '../framework/render.js';
import ContentListView from '../view/content-list-view.js';
import PointPresenter from './point-presenter.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import FirstPointView from '../view/list-empty-view.js';
import { updateItem } from '../utils.js';

export default class ContentPresenter {

  #siteEventElement = null;
  #siteBodyElement = null;
  #pointsModel = null;
  #pointListComponent = new ContentListView();
  #noPointView = new FirstPointView();
  #sortView = new SortView();
  #filterView = new FilterView();
  #boardPoints = [];
  #pointPresenter = new Map();

  constructor(siteEventElement, pointsModel, boardPoints, siteBodyElement) {
    this.#siteEventElement = siteEventElement;
    this.#siteBodyElement = siteBodyElement;
    this.#pointsModel = pointsModel;
    this.#boardPoints = boardPoints;
  }

  init() {
    this.#renderFilter();
    this.#boardPoints = [...this.#pointsModel.points];
    this.#renderBoard();
  }

  #renderFilter() {
    render(this.#filterView, this.#siteBodyElement);
  }

  #renderSort() {
    render(this.#sortView, this.#siteEventElement, RenderPosition.AFTERBEGIN);
  }

  #renderFirstPoint() {
    render(this.#noPointView, this.#siteEventElement, RenderPosition.AFTERBEGIN);
  }

  #renderBoard() {
    if (this.#boardPoints.every((point) => point.id)) {
      this.#renderSort();
      render(this.#pointListComponent, this.#siteEventElement);
      this.#boardPoints.forEach((value) => this.#renderPoint(value));
    } else {
      this.#renderFirstPoint();
    }
  }

  #clearPointList() {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }
}
