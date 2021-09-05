import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "./Home/Home";
import MovieDetail from "./MovieDetail/movie-detail";

const Routes = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact component={Home} path="/" />
          <Route exact component={MovieDetail} path="/movie-detail/:imdbID" />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default Routes;
