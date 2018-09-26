/* eslint-env browser */
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import thunk from 'redux-thunk';
import epigramApp from './reducers';
import Root from './components/Root';
import './css/index.css';
import config from './config/config.json';

const middleware = [thunk];
const store = createStore(
  epigramApp,
  applyMiddleware(...middleware),
);

const apiKey = Cookies.get('token');
if (apiKey) {
  axios.defaults.headers.common['X-API-KEY'] = apiKey;
}
axios.defaults.baseURL = config.api_url;

render(
  <Root store={store} />, // eslint-disable-line react/jsx-filename-extension
  document.getElementById('root'),
);
