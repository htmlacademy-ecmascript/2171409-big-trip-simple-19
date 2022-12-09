import { createElement } from '../render.js';

function createContentList() {
  return ('<ul class="trip-events__list"></ul>');
}

export default class ContentListView {
  getTemplate() {
    return createContentList();
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
