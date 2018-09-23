import React from 'react';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import logo from '../logo.svg';
import '../App.css';

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

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
        <MuiThemeProvider theme={theme}>
          <Button variant="contained" color="primary">
            Congratulation !
          </Button>
        </MuiThemeProvider>
      </p>
    </div>
  )
);

export default App2;
