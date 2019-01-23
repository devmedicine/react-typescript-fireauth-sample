import React from 'react';
import {BrowserRouter, Link, Route} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import SignUp from "./SignUp";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Button from "@material-ui/core/Button/Button";

const App = () => (
  <BrowserRouter>
    <div>
      <AppBar position="static" color="default">
        <Toolbar>
          <Button variant="contained">
            <Link to={'/'}>home</Link>
          </Button>
          <Button variant="contained">
            <Link to={'/signup'}>signup</Link>
          </Button>
        </Toolbar>
      </AppBar>
      <Route exact path='/' component={DefaultApp}/>
      <Route path='/signup' component={SignUp}/>
    </div>
  </BrowserRouter>
);

class DefaultApp extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
