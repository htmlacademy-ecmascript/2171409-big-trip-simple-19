import AbstractView from '../framework/view/abstract-view.js';
import { getDate, isTimeStart, getUppercase } from '../utils.js';


function pointTemplate(point) {
  const { dateFrom, dateTo, type, basePrice, destination, offers } = point;
  const dayFrom = getDate(dateFrom);
  const typeEvent = getUppercase(type.title);
  const timeStart = isTimeStart(dateFrom);
  const timeEnd = isTimeStart(dateTo);

  return (
    `<li class="trip-events__item">
    <div class="event">
    <time class="event__date" datetime="${dayFrom}">${dayFrom}</time>
    <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type.title}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${typeEvent} ${destination.title}</h3>
    <div class="event__schedule">
        <p class="event__time">
            <time class="event__start-time" datetime="${timeStart}">${timeStart}</time>
            &mdash;
            <time class="event__end-time" datetime="${timeEnd}">${timeEnd}</time>
        </p>
    </div>
    <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">        
    ${offers.map((data) => `
        <li class="event__offer">
              <span class="event__offer-title">${data.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${data.price}</span>
          </li>
    `).join('')}
    </ul>
    <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
    </button>
</div></li>`
  );
}

export default class PointView extends AbstractView {

  #point = null;
  #handleEditClick = null;

  constructor({ point, onEditClick }) {
    super();
    this.#point = point;
    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return pointTemplate(this.#point);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
