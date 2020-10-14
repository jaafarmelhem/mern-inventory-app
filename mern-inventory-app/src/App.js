import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import CreateDevice from "./components/create-device.component";
import EditDevice from "./components/edit-device.component";
import DevicesList from "./components/devices-list.component";

import signup from "./components/signup.component";


import logo from "./logo.png";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="" target="_blank">
             <img src={logo} width="30" height="30" /> 
            </a>
            <Link to="/" className="navbar-brand">MERN-Stack Inventory App</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Devices</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Device</Link>
                </li>
              </ul>
            </div>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">          
                    <Link to="/signup" className="nav-link">Sign Up Screen</Link>
                </li>
                <li className="navbar-item">          
                    <Link to="/login" className="nav-link">Log in Screen</Link>
                </li>
                <li className="navbar-item">           
                    <Link to="/profile" className="nav-link">Profile Page</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={DevicesList} />
          <Route path="/edit/:id" component={EditDevice} />
          <Route path="/create" component={CreateDevice} />
          <Route path="/signup" component={signup} />
        </div>
      </Router>
    );
  }
}

export default App;
