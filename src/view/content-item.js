import { createElement } from '../render.js';

function createContentItem() {
  return (`
  <li class="trip-events__item"></li>
  `);
}

export default class ContentItemView {
  getTemplate() {
    return createContentItem();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
