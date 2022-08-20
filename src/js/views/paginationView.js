import View from "./view.js";
import icons from "url:../../img/icons.svg"; //parcle 2

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkupBtnNext(curPage, numPages) {
    return `
      <button data-goto = '${
        curPage + 1
      }' class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>

      `;
  }
  _generateMarkupBtnPrev(curPage, numPages) {
    return `
    <button data-goto = '${
      curPage - 1
    }' class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
      </button>
    `;
  }
  _generateMarkup() {
    const curPage = this._data.page;
    let numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    //page 1, there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupBtnNext(curPage, numPages);
    }
    //Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupBtnPrev(curPage, numPages);
    }
    //Other page
    if (curPage < numPages) {
      const arr = [
        this._generateMarkupBtnPrev(curPage, undefined),
        this._generateMarkupBtnNext(curPage, numPages),
      ];
      return arr.map((el) => {
        return el;
      });
    }
    //page 1, there are NO other pages
    return ``;
  }
}
export default new PaginationView();
