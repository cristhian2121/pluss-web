import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { GeneratePDF } from "./components/common/pdf";
import Login from "./pages/login";

import { MakeRate } from './components/make-rates/list'
import { User } from './pages/users'
import { CreateQuotation } from './components/make-rates/create/'
import PageNotFound from './components/common/page-not-found'
import { Menu } from './components/common/nav-bar'
import { Clients } from './components/clients/client'
import { ProductComponent } from './pages/products'

import "./App.css";

function App() {
  const DefaultContainer = () => (
    <Menu >
      <Switch>
        <Route exact path="/cotizaciones" component={MakeRate} />
        <Route exact path="/usuarios" component={User} />
        <Route exact path="/cotizaciones/crear" component={CreateQuotation} />
        <Route exact path="/clientes" component={Clients} />
        <Route exact path="/productos" component={ProductComponent} />
        <Route component={PageNotFound} />
      </Switch>
    </Menu>
  )

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/cotizacion" component={GeneratePDF} />
          <Route exact path="/cotizacion/:id" component={GeneratePDF} />
          <Route component={DefaultContainer} />
        </Switch>
      </Router>
    </div>
  );

}

export default App;
