import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import Login from './Login';
import Register from './Register';
import MenuBar from './MenuBar';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/photos" component={MenuBar} />
      </div>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.shape().isRequired,
};

export default Root;
