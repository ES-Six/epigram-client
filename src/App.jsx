import React from 'react';
import Button from '@material-ui/core/Button';
import logo from './logo.svg';
import './App.css';

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
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </p>
    </div>
  )
);

export default App;
