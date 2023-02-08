import { render, RenderPosition } from '../framework/render.js';
import ContentListView from '../view/content-list-view.js';
import PointPresenter from './point-presenter.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import FirstPointView from '../view/list-empty-view.js';
import { UpdateType, UserAction } from '../const.js';

export default class ContentPresenter {

  #siteEventElement = null;
  #siteBodyElement = null;
  #pointsModel = null;
  #pointListComponent = new ContentListView();
  #noPointView = new FirstPointView();
  #sortView = new SortView();
  #filterView = new FilterView();
  #pointPresenter = new Map();

  constructor(siteEventElement, pointsModel, siteHeaderTripElement, siteBodyElement) {
    this.#siteEventElement = siteEventElement;
    this.#siteBodyElement = siteBodyElement;
    this.#pointsModel = pointsModel;
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    return this.#pointsModel.points;
  }

  init() {
    this.#renderFilter();
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
    const pointCount = this.points.length;
    const points = this.points;

    if (points.every((point) => point.id)) {
      this.#renderSort();
      render(this.#pointListComponent, this.#siteEventElement);
      for (let i = 0; i < pointCount; i++) {
        this.#renderPoint(points[i]);
      }
    } else {
      this.#renderFirstPoint();
    }
  }

  // #clearPointList() {
  //   this.#pointPresenter.forEach((presenter) => presenter.destroy());
  //   this.#pointPresenter.clear();
  // }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    // console.log(actionType, updateType, update);
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#pointsModel.updateTask(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this.#pointsModel.addTask(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this.#pointsModel.deleteTask(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    // console.log(updateType, data);
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }
}
