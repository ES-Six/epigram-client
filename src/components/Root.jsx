import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TranslatorProvider } from 'react-translate';
import connect from 'react-redux/es/connect/connect';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import PhotoGalery from './PhotoGalery';
import AccountManagement from './AccountManagement';
import PhotoUpload from './PhotoUpload';
import PhotoDetails from './PhotoDetails';
import UserProfileForm from './UserProfileForm';
import available from '../i18n/available';
import defaultLocale from '../i18n/en-en';

import {
  fetchLanguage,
} from '../actions/MenuBar';

class Root extends PureComponent {
  componentDidMount() {
    const { store } = this.props;
    const { dispatch } = store;

    const browserLanguage = (
      available.indexOf(global.navigator.language.toLowerCase()) !== -1 ? global.navigator.language.toLowerCase() : 'en-en'
    );

    dispatch(fetchLanguage(browserLanguage));
  }

  render() {
    const { store } = this.props;
    const { translationsOverride } = store.getState().MenuBar;

    return (
      <TranslatorProvider translations={translationsOverride || defaultLocale}>
        <Provider store={store}>
          <Router>
            <div>
              <Route path="/" exact component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/home" component={Home} />
              <Route path="/categories/:id" exact component={PhotoGalery} />
              <Route path="/account" exact component={AccountManagement} />
              <Route path="/upload" exact component={PhotoUpload} />
              <Route path="/photo/:id" exact component={PhotoDetails} />
              <Route path="/update_profile" exact component={UserProfileForm} />
            </div>
          </Router>
        </Provider>
      </TranslatorProvider>
    );
  }
}

const mapStateToProps = state => ({
  translationsOverride: state.MenuBar.translationsOverride,
});

Root.propTypes = {
  store: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(Root);
