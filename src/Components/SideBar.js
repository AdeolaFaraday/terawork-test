import React, { useState } from "react";
import SearchSvg from "./Search.svg";
import HeartSvg from "./Heart.svg";

const SideBar = (props) => {
  return (
    <div className="side-bar">
      <h1>
        Show<span style={{ color: "#5F2EEA" }}>Fix</span>
      </h1>
      <div className="search-icon-container">
        <img className="icon-sidebar search-icon-sidebar" src={SearchSvg} />
        <p>Search</p>
      </div>
      <div className="watch-icon-container">
        <img className="icon-sidebar watch-list-icon" src={HeartSvg} />
        <p>Watchlist</p>
      </div>
    </div>
  );
};

export default SideBar;
