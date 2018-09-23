import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import App from './App';
import App2 from './App2';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/" exact component={App} />
        <Route path="/page2" component={App2} />
      </div>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Root;
