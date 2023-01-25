import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { TYPE } from '../const.js';
import { isTimeStart, getUppercase, getDateFull } from '../utils.js';

const BLANK_TASK = {
  basePrice: null,
  dateFrom: null,
  dateTo: null,
  destination: '',
  offers: [],
  type: TYPE[0],
};

function createPointEditTypeTemplate(currentType) {
  return TYPE.map((type) => `
                              <div class="event__type-item">
                                <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${currentType === type ? 'checked' : ''}>
                                <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${getUppercase(type)}</label>
                              </div>
                            `).join('');
}

function createOffersTemplate(currentOffers) {
  return currentOffers.map((offer) => `
                                  <div class="event__offer-selector">
                                    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.word}-1" type="checkbox" name="event-offer-${offer.word}" ${offer.active ? 'checked' : ''}>
                                    <label class="event__offer-label" for="event-offer-${offer.word}-1">
                                      <span class="event__offer-title">${offer.title}</span>
                                      &plus;&euro;&nbsp;
                                      <span class="event__offer-price">${offer.price}</span>
                                    </label>
                                  </div>`).join('');
}

function createPicturesTemplate(currentPictures) {
  return currentPictures.map((pictures) => `
    <img class="event__photo" src="${pictures.src}.jpg" alt="${pictures.description}">
  `);
}

function editPointTemplate(point) {

  const { dateFrom, dateTo, type, basePrice, destination, offers } = point;

  const dayFrom = getDateFull(dateFrom);
  const timeStart = isTimeStart(dateFrom);
  const typesTemplate = createPointEditTypeTemplate(type);
  const typeEvent = getUppercase(type.title || typesTemplate);
  const timeEnd = isTimeStart(dateTo);
  const offersTemplate = createOffersTemplate(offers.flat());
  const picturesTemplate = createPicturesTemplate(destination.pictures.flat());

  return (`
              <li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type.title}.png" alt = "Event type icon" >
                    </label >
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                          ${typesTemplate}                        
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${typeEvent}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.title}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      <option value="Amsterdam"></option>
                      <option value="Geneva"></option>
                      <option value="Chamonix"></option>
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
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>                    
                    <div class="event__available-offers">
                      ${offersTemplate}
                    </div>
                  </section>
                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destination.destination}</p>
                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${picturesTemplate}
                      </div>
                    </div>
                  </section>
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
  #type = null;
  #destination = null;
  #offer = null;

  constructor({ point = BLANK_TASK, type, destination, offer, onFormSubmit, onCloseForm, onDeleteClick, onSelectOffer }) {
    super();
    this._setState(EditPointView.parsePointToState(point));
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseForm = onCloseForm;
    this.#handleDeleteClick = onDeleteClick;
    this.#offerInputHandler = onSelectOffer;
    this.#type = type;
    this.#destination = destination;
    this.#offer = offer;

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
    this.element.querySelector('.event__offer-checkbox').addEventListener('change', this.#offerInputHandler);
  }

  get template() {
    return editPointTemplate(this._state);
  }

  removeElement() {
    super.removeElement();
  }

  #offerInputHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      offers: { ...this._state.offers, [evt.target.value]: evt.target.checked },
    });
  };

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
    return {
      ...point,
    };
  }

  static parseStateToPoint(state) {
    const point = { ...state };

    return point;
  }

}
