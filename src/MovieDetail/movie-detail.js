import React, { useEffect, useState } from "react";
import { movieDetail } from "../actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import SearchSvg from "./Search.svg";
// import HeartSvg from "./Heart.svg";

const MovieDetail = (props) => {
  useEffect(() => {
    props.movieDetail(props.match.params.imdbID);
  }, [props.match.params.imdbID]);

  const { movieDetailResult } = props;

  return (
    <div className="hero-section">
      <div className="side-bar">
        <h1>
          Show<span style={{ color: "#5F2EEA" }}>Fix</span>
        </h1>
        <div className="search-icon-container">
          <img className="icon-sidebar search-icon-sidebar" />
          <p>Search</p>
        </div>
        <div className="watch-icon-container">
          <img className="icon-sidebar watch-list-icon" />
          <p>Watchlist</p>
        </div>
      </div>
      <div>
        <div className="movie-details">
          <div className="movie-details-img-container">
            <img src={movieDetailResult.Poster} />
          </div>
          <div className="movie-details-container">
            <h1>{movieDetailResult.Title}</h1>
            <p className="detail-plot">{movieDetailResult.Plot}</p>
            <div className="meta-detail">
              <p>{movieDetailResult.Released}</p>
              <p>{movieDetailResult.imdbRating}</p>
              <p>{movieDetailResult.Runtime}</p>
            </div>
            <div>
              <input
                className="submit-search watch-btn"
                type="button"
                value="Watch Now"
              />
              <img />
            </div>
          </div>
        </div>
        <div className="similar-movies-section">
          <h1 className="similar">Similar Movies</h1>
          <div className="card-rapper">
          {props.similarMovies.map((res) => {
              return (
                <div className="card">
                  <img className="movie-image" src={res.Poster} />
                  <p>
                    <Link to={`/movie-detail/${res.imdbID}`}>View</Link>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// {props.searchResults.map(res => {
//   return <p>{res.Title}</p>
// })}

const mapStateToProps = (state) => {
  console.log(state.movieDetailResult);
  const similarMovies = state.searchResults.filter(
    (movie) => movie.imdbID !== state.movieDetailResult.imdbID
  );
  console.log(similarMovies);
  return { movieDetailResult: state.movieDetailResult, similarMovies };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ movieDetail }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
