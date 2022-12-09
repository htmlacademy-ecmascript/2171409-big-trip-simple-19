import FilterView from './view/filter.js';
import SortView from './view/sort.js';
import ContentPresenter from './presenter/board-presenter.js';
import { render } from './render.js';


const siteMainTripElement = document.querySelector('.trip-controls');
const siteHeaderTripElement = siteMainTripElement.querySelector('.trip-controls__filters');

const siteMainElement = document.querySelector('.page-main');
const siteHeaderElement = siteMainElement.querySelector('.trip-events');
const boardPresenter = new ContentPresenter({ contentContainer: siteHeaderElement });

render(new FilterView(), siteHeaderTripElement);
render(new SortView(), siteHeaderElement);

boardPresenter.init();
