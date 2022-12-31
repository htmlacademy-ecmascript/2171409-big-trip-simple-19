import { createElement } from '../render.js';

function createContentList() {
  return ('<ul class="trip-events__list"></ul>');
}

export default class ContentListView {

  #element = null;

  get template() {
    return createContentList();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
