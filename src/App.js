import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { GeneratePDF } from "./components/common/pdf";
import Login from "./pages/login";

import { MakeRate } from './components/make-rates/list'
import { Create } from './components/users'
import { CreateQuotation } from './components/make-rates/create/'
import PageNotFound from './components/common/page-not-found'
import { Menu } from './components/common/nav-bar'


import "./App.css";

function App() {
  return (
    <div className="App">
      <header></header>
      <Router>
        {/* <Route exact path="/cotizacion" component={GeneratePDF} /> */}
        {/* <Switch> */}
        {/* <Route exact path="/login" component={Login} /> */}
        <Route exact path="/cotizacion" component={GeneratePDF} />

        <Route component={Menu} />
        {/* <Route component={PageNotFound} /> */}
        {/* <Route exact path="/cotizaciones" component={MakeRate} />
          <Route exact path="/usuarios" component={Create} />
          <Route exact path="/cotizaciones/crear" component={CreateQuotation} />
          <Route component={PageNotFound} /> */}
        {/* </Switch> */}
      </Router>
    </div>
  );
}

export default App;
