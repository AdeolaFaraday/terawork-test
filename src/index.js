import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./home.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ReduxPromise from 'redux-promise'
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import Routes from "./Routes";

const createStoreWithMiddleWare = applyMiddleware(ReduxPromise)(createStore)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStoreWithMiddleWare(reducers)}>
      <Routes />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
