import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import logo from '../logo.svg';
import '../App.css';

const GreenButton = withStyles({
  root: {
    background: '#28a745',
    borderRadius: 3,
    border: 0,
    'border-color': '#28a745',
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    '&:hover': {
      background: '#20803b',
    },
  },
})(Button);

const App2 = () => (
  (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <p className="App-intro">
        Page 2: navigation detected
        <br />
        <GreenButton variant="contained">
          Congratulation !
        </GreenButton>
      </p>
    </div>
  )
);

export default App2;
