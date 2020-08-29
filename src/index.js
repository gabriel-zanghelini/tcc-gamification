import React, { Suspense } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";

import Spinner from "./components/Common/Spinner";
import AppView from "./views/AppView";

import "mobx-react/batchingForReactDom";

import "./configs/language";
import "./styles/global.css";
import "./styles/custom-antd.css";

ReactDOM.render(
  <Router>
    <Suspense fallback={<Spinner size="large" fixed />}>
      <AppView />
    </Suspense>
  </Router>,
  document.querySelector("#root")
);
