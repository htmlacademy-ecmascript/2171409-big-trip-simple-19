import AbstractView from '../framework/view/abstract-view.js';

function createContentList() {
  return ('<ul class="trip-events__list"></ul>');
}

export default class ContentListView extends AbstractView {

  get template() {
    return createContentList();
  }
}
