import React, { useEffect, useState } from "react";
import { movieDetail } from "../actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../Components/SideBar";
// import SearchSvg from "./Search.svg";
// import HeartSvg from "./Heart.svg";

const MovieDetail = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [toggleHide, setToggleHide] = useState(false);
  const [currentMovie, setCurrentMovie] = useState({});
  const [currentMovieView, setCurrentMovieView] = useState(null)
  useEffect(() => {
    props.movieDetail(props.match.params.imdbID);
  }, [props.match.params.imdbID]);

  const { movieDetailResult } = props;

  const handleView = async (id) => {
    const currentSelected = await props.movieDetail(id);
    console.log(currentSelected);
    setCurrentMovie(currentSelected.payload);
    setModalShow(true);
  };

  const closeModal = () => {
    setModalShow(false);
    setToggleHide(false);
  };

  return (
    <>
    <div className="hero-section">
     <SideBar />
      <div>
        <div className="movie-details">
          <div className="movie-details-img-container">
            <img src={movieDetailResult.Poster} />
          </div>
          <div className="movie-details-container">
            <h1>{movieDetailResult.Title}</h1>
            <p className="detail-plot">{movieDetailResult.Plot}</p>
            <div className="meta-detail">
              <p><i class="far fa-clock"></i>{movieDetailResult.Released}</p>
              <p><i class="far fa-star"></i>{movieDetailResult.imdbRating}</p>
              <p><i class="fas fa-play"></i>{movieDetailResult.Runtime}</p>
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
                  <p onClick={() => handleView(res.imdbID)}>View</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
    <div
        className={`${
          modalShow === false
            ? "modal-none"
            : toggleHide === false
            ? "modal-div"
            : "right"
        }`}
      >
        <i onClick={() => closeModal()} class="fas fa-arrow-left"></i>
        <div className="modal-details">
          <div className="modal-details-img-container">
            <img src={currentMovie.Poster && currentMovie.Poster} />
          </div>
          <div className="modal-details-container">
            <h2>{currentMovie.Title && currentMovie.Title}</h2>
            <p className="modal-plot">
              {currentMovie.Plot && currentMovie.Plot}
            </p>
            <div>
                <input
                  className="modal-watch-btn"
                  type="button"
                  value="Watch Now"
                />
            </div>
          </div>
        </div>
      </div>
    </>
    
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

//