import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
 
import App from '../app';
import Home from  '../components/pages/home';
import Registration from "../components/pages/registration";
import Instruction from "../components/pages/instruction";
import Login from "../components/pages/login";
import Dashboard from "../components/pages/dashboard";

// import 'styles/index.scss'; /* commented index.scss -GM */
const Routes = () => (
  <Router onUpdate={() => window.scrollTo(0, 0)}>
    <div>
      <Route exact path = "/*" component={App}/>
      <Route exact path = "/home" component={Home}/>     
      <Route exact path="/instruction" component={Instruction}/>  
      <Route exact path = "/registration" component={Registration} />
      <Route exact path = "/login" component={Login} />
      <Route exact path = "/dashboard" component={Dashboard} />
    </div>
  </Router>
);

export default Routes;
