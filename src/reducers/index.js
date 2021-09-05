import { combineReducers } from "redux";

const searchReducer = (location = [], action) => {
  console.log(action.payload);
  if (action.type === "SEARCH_MOVIES") {
    console.log(action.payload);
    return action.payload
  }
  return location;
};

const movieDetailReducer = (movie = {}, action) => {
  if (action.type === "SEARCH_MOVIE") {
    console.log(action.payload);
    return action.payload
  }
  return movie;
}

export default combineReducers({
  searchResults: searchReducer,
  movieDetailResult: movieDetailReducer
});
