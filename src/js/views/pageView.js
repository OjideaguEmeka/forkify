import View from './view.js';
import icons from 'url:../../img/icons.svg';

class pageView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline ');
      if (!btn) return;
      const dataLogo = +btn.dataset.goto;
      handler(dataLogo);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );

    if (currPage === 1 && currPage < numPages) {
      return `
          <button data-goto = "${
            currPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> 
        `;
    }
    if (currPage > 1 && currPage < numPages) {
      return `
         <button data-goto = "${
           currPage - 1
         }"  class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${currPage - 1}</span>
          </button>

          <button data-goto = "${
            currPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> 
        
        `;
    }
    if (currPage > 1 && currPage === numPages) {
      return `
         <button data-goto = "${
           currPage - 1
         }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${currPage - 1}</span>
          </button>
        
        `;
    }
  }
}

export default new pageView();
