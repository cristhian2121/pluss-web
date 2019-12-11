import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./pages/login";
import Menu from './components/common/nav-bar/index'

import "./App.css";

function App() {
  return (
    <div className="App">
      <header></header>
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
