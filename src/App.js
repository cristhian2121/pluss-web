import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { CreateMakeRate } from "./components/make-rates/create/index";
import { User } from "./components/users/index";
import PageNotFound from "./components/common/page-not-found";
import Menu from './components/common/nav-bar/index'

import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="">

      </header>
      {/* <Menu /> */}
      <Router>
        <Switch>
          <Route exact path="/" component={User} />
          <Route exact path="/cotizaciones/crear" component={CreateMakeRate} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
