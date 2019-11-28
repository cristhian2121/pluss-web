import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { CreateMakeRate } from "./components/make-rates/create/index";
import Login from "./pages/login";
import PageNotFound from "./components/common/page-not-found";
import Menu from './components/common/nav-bar/index'

import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="">

      </header>
      <Router>
      <Menu />
        <Switch>
          <Route exact path="/login" component={Login} />
          {/* <Route exact path="/" component={Menu} /> */}
          {/* <Route component={PageNotFound} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
