import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { TYPE } from '../const.js';
import { isTimeStart, getDateFull, findOffers } from '../utils.js';
import { offersByTypeList, offersList, destinationsList } from '../mock/point.js';

const BLANK_TASK = {
  basePrice: null,
  dateFrom: null,
  dateTo: null,
  destination: '',
  offers: [],
  type: TYPE[0],
};

const createEventListTemplate = (type) => (
  `<div class="event__type-list">
  <fieldset class="event__type-group">
    <legend class="visually-hidden">Event type</legend>
      ${TYPE.map((name) =>
    `<div class="event__type-item">
          <input id="event-type-${name}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${name}" ${type === name ? 'checked' : ''}>
          <label class="event__type-label  event__type-label--${name}" for="event-type-${name}-1">${name}</label>
        </div>`).join('')}
  </fieldset>
</div>`
);

function createDestinationsListTemplate(options) {
  return options?.map((option) => `<option value="${option.title}"></option>`).join('');
};



const createOffersTemplate = (offers) => {
  if (offers !== null) {
    return (
      `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">${offers.map(({ id, title, price }) =>
        `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}" type="checkbox" name="event-offer-${id}">
            <label class="event__offer-label" for="event-offer-${id}">
              <span class="event__offer-title">${title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${price}</span>
            </label>
        </div>`).join('')}
    </div>
  </section>`);
  } else {
    return '';
  }
};

function createPicturesTemplate(currentPictures) {
  return currentPictures?.map(({ src, description }) => `
        <img class="event__photo" src="${src}.jpg" alt="${description}">
  `).join('');
};

const createDestinationTemplate = (destination) => {
  const { title, pictures } = destination;
  return `
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${title}</p>
        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${createPicturesTemplate(pictures)}
          </div>
        </div>
      </section>`;
};

function editPointTemplate(point = BLANK_TASK, showBtn) {

  const { dateFrom, dateTo, type, basePrice, destination, offers } = point;

  const getCurrentDestination = (destinations, id) => destinations.find((destination) => destination.id === id);
  const destinationTemplate = getCurrentDestination(destinationsList, destination.id) ? createDestinationTemplate(destination) : '';

  const dayFrom = getDateFull(dateFrom);
  const timeStart = isTimeStart(dateFrom);
  const timeEnd = isTimeStart(dateTo);
  const offersTemplate = createOffersTemplate(offers.flat());
  const eventListTemplate = createEventListTemplate(type);
  const destinationCurrentName = getCurrentDestination(destinationsList, destination.id);
  const destinationsListTemplate = createDestinationsListTemplate(destinationsList);
  console.log(destinationCurrentName.title);

  return (`
              <li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type.title || type}.png" alt = "Event type icon" >
                    </label >
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
                      ${eventListTemplate}
                  </div>
                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type.title || type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-${destination.id}" type="text" name="event-destination" list="destination-list-1" value="${destinationCurrentName.title}">
                    <datalist id="destination-list-1">
                      ${destinationsListTemplate}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayFrom} ${timeStart}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayFrom} ${timeEnd}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value='${basePrice}'>
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  ${showBtn ? '<button class="event__rollup-btn" type="button">' : ''}
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                      ${offersTemplate}
                  ${destinationTemplate}
                </section>
              </form>
            </li >
  `);
}

export default class EditPointView extends AbstractStatefulView {

  #point = null;
  #handleFormSubmit = null;
  #handleCloseForm = null;
  #handleDeleteClick = null;
  #offersByType = null;
  #type = null;
  #destination = null;
  #offer = null;
  #showBtn = null;

  constructor({ point = BLANK_TASK, type, destination, offer, onFormSubmit, onCloseForm, onDeleteClick }, showBtn) {
    super();
    this._setState(EditPointView.parsePointToState(point));
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseForm = onCloseForm;
    this.#handleDeleteClick = onDeleteClick;
    this.#type = type;
    this.#destination = destination;
    this.#offer = offer;
    this.#showBtn = showBtn;

    this._restoreHandlers();
  }

  reset(point) {
    this.updateElement(
      EditPointView.parsePointToState(point),
    );
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formCloseHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
    // this.element.querySelector('.event__input--price').addEventListener('input', this.#priceInputHandler);
    // this.element.querySelector('.event__offer-checkbox').addEventListener('change', this.#offerInputHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationInputHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#eventTypeChangeHandler);
  }

  get template() {
    return editPointTemplate(this._state, this.#showBtn);
  }

  removeElement() {
    super.removeElement();
  }

  #eventTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: findOffers(offersByTypeList, evt.target.value, offersList)
    });
  };

  #destinationInputHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      destination: evt.target.value,
    });
  };

  // #offerInputHandler = (evt) => {
  //   evt.preventDefault();
  //   this.updateElement({
  //     offers: { ...this._state.offers, [evt.target.value]: evt.target.checked },
  //   });
  // };

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: evt.target.value,
    });
  };


  #formCloseHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseForm();

  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditPointView.parseStateToPoint(this._state));
  };

  static parsePointToState(point) {
    return { ...point };
  }

  static parseStateToPoint(state) {
    return { ...state };
  }

}
