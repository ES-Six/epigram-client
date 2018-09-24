/* eslint-env browser */
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import epigramApp from './reducers';
import Root from './components/Root';
import './css/index.css';
import config from './config/config.json';

const store = createStore(epigramApp);

const apiKey = Cookies.get('token');
if (apiKey) {
  axios.defaults.headers.get['X-API-KEY'] = apiKey;
}
axios.defaults.baseURL = config.api_url;

render(
  <Root store={store} />, // eslint-disable-line react/jsx-filename-extension
  document.getElementById('root'),
);
