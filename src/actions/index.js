import axios from "axios";
import { api } from "../config";

export const searchMovie = async (term) => {
  // Return an action
  const url = `http://www.omdbapi.com/?i=tt3896198&apikey=${api}&&s=${term}`
  const request = await axios.get(url);
  const result = request.data.Error ? [] : request.data.Search
  console.log(result);
  return {
    type: "SEARCH_MOVIES",
    payload: result,
  };
};

export const movieDetail = async (term) => {
  // Return an action
  const url = `http://www.omdbapi.com/?apikey=${api}&i=${term}`
  const request = await axios.get(url);
  return {
    type: "SEARCH_MOVIE",
    payload: request.data,
  };
};
