import { createElement } from '../render.js';

function createContentItem() {
  return (`
  <li class="trip-events__item"></li>
  `);
}

export default class ContentItemView {
  #element = null;

  get template() {
    return createContentItem();
  }

  get element() {
    if (!this.element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
