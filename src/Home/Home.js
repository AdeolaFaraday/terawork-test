import React, { useState } from "react";
// import "./home.css";
import { searchMovie, movieDetail } from "../actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import SearchSvg from "./Search.svg";
import HeartSvg from "./Heart.svg";
import { Link } from "react-router-dom";
import SideBar from "../Components/SideBar";

const Home = (props) => {
  const [term, setTerm] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [toggleHide, setToggleHide] = useState(false);
  const [currentMovie, setCurrentMovie] = useState({});

  const handleClick = () => {
    console.log("called");
    props.searchMovie(term);
  };

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

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
    <div className="main-div">
      <div className="hero-section">
        <SideBar />
        <div className="movie-display">
          <h1>Explore</h1>
          <div className="search-container">
            <img className="search-icon" src={SearchSvg} />
            <input
              className="search-box"
              onChange={handleChange}
              type="text"
              placeholder="search"
            ></input>
            {window.innerWidth > 400 ? (
              <input
                onClick={handleClick}
                className="submit-search"
                type="button"
                value="Search"
              />
            ) : (
              <img
                onClick={handleClick}
                className="icon-sidebar search-icon-sidebar"
                src={SearchSvg}
              />
            )}
          </div>
          <div className="result-section">
            <p className="result-text">Results for: {term}</p>
            <div className="card-rapper">
              {props.searchResults.map((res) => {
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
              <Link to={`movie-detail/${currentMovie.imdbID}`}>
                <input
                  onClick={() => setToggleHide(true)}
                  className="modal-watch-btn"
                  type="button"
                  value="Watch Now"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state.searchResults);
  return { searchResults: state.searchResults };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchMovie, movieDetail }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
