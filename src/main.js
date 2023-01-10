import ContentPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';

const siteMainTripElement = document.querySelector('.trip-controls');
const siteHeaderTripElement = siteMainTripElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const siteBodyElement = siteMainElement.querySelector('.page-body__container');
const siteEventElement = siteMainElement.querySelector('.trip-events');
const pointsModel = new PointsModel();
const boardPresenter = new ContentPresenter(siteEventElement, pointsModel, siteBodyElement, siteHeaderTripElement);

boardPresenter.init();
