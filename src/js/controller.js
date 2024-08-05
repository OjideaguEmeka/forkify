import recipeView from './views/recipeView.js';
import * as model from './model.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import pageView from './views/pageView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';
console.log(MODAL_CLOSE_SEC);
//const [icons] = iconsUrl.split('?');
//console.log(icons);

//const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

//forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886

///////////////////////////////////////
/*
if (module.hot) {
  module.hot.accept();
} */

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();
    resultsView.update(model.getSearchResultsPage());
    bookmarkView.update(model.state.bookmarks);

    await model.loadRecipe(id);

    //const { recipe } = model.state;

    recipeView.render(model.state.recipes);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    // resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResult(query);
    resultsView.render(model.getSearchResultsPage());
    console.log(2222);
    pageView.render(model.state.search);
  } catch (err) {}
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  pageView.render(model.state.search);
};

const controlServings = function (servings) {
  model.updateServings(servings);
  recipeView.update(model.state.recipes);
};

const controlAddBookmark = function () {
  if (!model.state.recipes.bookmarked) model.addBookmark(model.state.recipes);
  else model.deleteBookmark(model.state.recipes.id);
  recipeView.update(model.state.recipes);
  bookmarkView.render(model.state.bookmarks);
  console.log(model.state.recipes);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uplaodRecipe(newRecipe);
    console.log(model.state.recipes);

    recipeView.render(model.state.recipes);

    addRecipeView.renderMessage();

    bookmarkView.render(model.state.bookmarks);

    window.history.pushState(null, '', `#${model.state.recipes.id}`);

    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err);
  }
};

const init = function () {
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  pageView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
