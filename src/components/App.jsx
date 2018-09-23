import React from 'react';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import logo from '../logo.svg';
import '../App.css';

const App = () => (
  (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <p className="App-intro">
        To get started, edit
        <code>src/App.jsx</code>
        and save to reload.
        <br />

        <NavLink to="/page2">
          <Button variant="contained" color="primary">
            Go to page 2
          </Button>
        </NavLink>

      </p>
    </div>
  )
);

export default App;
