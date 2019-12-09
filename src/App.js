import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { GeneratePDF } from "./components/common/pdf";
import Login from "./pages/login";

import { MakeRate } from './components/make-rates/list'
import { Create } from './components/users'
import { CreateQuotation } from './components/make-rates/create/'
import PageNotFound from './components/common/page-not-found'
import { Menu } from './components/common/nav-bar'
import { Clients } from './components/clients/client'



import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/cotizacion" component={GeneratePDF} />
        <Menu>
          <Switch>
            <Route exact path="/cotizaciones" component={MakeRate} />
            <Route exact path="/usuarios" component={Create} />
            <Route exact path="/cotizaciones/crear" component={CreateQuotation} />
            <Route exact path="/clientes" component={Clients} />
            <Route component={PageNotFound} />
          </Switch>
      </Menu>
      </Router>
    </div>
  );
}

export default App;
