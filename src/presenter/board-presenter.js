import AMOUNTITEMS from '../constants.js';
import ContentListView from '../view/content-list.js';
import NewPointView from '../view/point-new.js';
import EditPointView from '../view/point-edit.js';
import PointView from '../view/point.js';
import { render } from '../render.js';

export default class ContentPresenter {
  contentComponent = new ContentListView();

  constructor({ contentContainer }) {
    this.contentContainer = contentContainer;
  }

  init() {
    render(this.contentComponent, this.contentContainer);
    render(new NewPointView(), this.contentComponent.getElement());
    render(new EditPointView(), this.contentComponent.getElement());
    for (let i = 0; i < AMOUNTITEMS; i++) {
      render(new PointView(), this.contentComponent.getElement());
    }
  }
}
