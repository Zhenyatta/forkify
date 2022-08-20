import View from "./View.js";
import icons from "url:../../img/icons.svg"; // Parcel 2

class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");
  _message = "Recipe was successfully uploaded :)";

  _inputTest = document.querySelectorAll(".input-test");

  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
    this._inputTest.forEach((input) =>
      input.addEventListener("keyup", function () {
        const arr = [...this.value];
        let counter = 0;
        arr.forEach((el) => (el.includes(",") ? counter++ : counter));
        const firstNum = this.value.slice(0, this.value.search(","));

        if (counter === 2 && Number.isFinite(+firstNum)) {
          input.style.color = "black";
        } else {
          input.style.color = "red";
        }
      })
    );
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
