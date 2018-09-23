/* eslint-env browser */
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import epigramApp from './reducers';
import Root from './components/Root';
import './css/index.css';

const store = createStore(epigramApp);

render(
  <Root store={store} />, // eslint-disable-line react/jsx-filename-extension
  document.getElementById('root'),
);
