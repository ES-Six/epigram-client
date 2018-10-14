import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import compose from 'recompose/compose';
import { translate } from 'react-translate';

import {
  updateEmail,
  updatePassword,
  setLoginError,
} from '../actions/Login';

const LoginContainer = (props) => {
  const { classes } = props;
  const { history } = props;
  const { loginError } = props;
  const { email } = props;
  const { password } = props;
  const { t } = props;

  const handleChange = action => (event) => {
    props.dispatch(action(event.target.value));
  };

  let errorField = null;
  if (loginError) {
    errorField = <h4 className={classes.error}>{t('INVALID_CREDENTIALS')}</h4>;
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios.post('/user/login', {
      email,
      password,
    }).then((response) => {
      Cookies.set('token', response.data.result.token, { expires: 30 });
      axios.defaults.headers.common['X-API-KEY'] = response.data.result.token;
      history.push('/home');
    }).catch(() => {
      props.dispatch(setLoginError(true));
    });
  };

  return (
    <div>
      {errorField}
      <form
        onSubmit={handleFormSubmit}
      >
        <Grid item xs={12}>
          <TextField
            required
            label={t('EMAIL')}
            type="email"
            placeholder={t('EMAIL_PLACEHOLDER')}
            className={classes.textField}
            margin="normal"
            value={email}
            onChange={handleChange(updateEmail)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label={t('PASSWORD')}
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
            value={password}
            onChange={handleChange(updatePassword)}
          />
        </Grid>
        <br />
        <Link to="/register">{t('REGISTRATION_LINK')}</Link>
        <br />
        <br />
        <Button type="submit" variant="contained" color="primary">{t('LOGIN_BTN')}</Button>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  loginError: state.Login.loginError,
  email: state.Login.email,
  password: state.Login.password,
  translationsOverride: state.MenuBar.translationsOverride,
});

LoginContainer.defaultProps = {
  loginError: false,
  email: '',
  password: '',
};

LoginContainer.propTypes = {
  classes: PropTypes.shape({
    error: PropTypes.string.isRequired,
    textField: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
  loginError: PropTypes.bool,
  email: PropTypes.string,
  password: PropTypes.string,
  t: PropTypes.func.isRequired,
};

export default compose(
  connect(mapStateToProps),
  translate('Login'),
)(LoginContainer);
