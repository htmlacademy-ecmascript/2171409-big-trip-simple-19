import FilterView from './view/filter.js';
import SortView from './view/sort.js';
import ContentPresenter from './presenter/board-presenter.js';
import { render } from './render.js';
import PointsModel from './model/points-model.js';
import FirstPointView from './view/list-empty.js';

const siteMainTripElement = document.querySelector('.trip-controls');
const siteHeaderTripElement = siteMainTripElement.querySelector('.trip-controls__filters');
const pointsModel = new PointsModel();

const siteMainElement = document.querySelector('.page-main');
const siteBodyElement = siteMainElement.querySelector('.page-body__container');
const siteHeaderElement = siteMainElement.querySelector('.trip-events');
const boardPresenter = new ContentPresenter(siteHeaderElement, pointsModel);

render(new FirstPointView(), siteBodyElement);
render(new FilterView(), siteHeaderTripElement);
// render(new SortView(), siteHeaderElement);

// boardPresenter.init();
