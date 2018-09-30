import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  setPasswordDoesntMatchErorr,
  updateEmail,
  updatePassword,
  updatePasswordConfirmation,
  setEmailAlreadyUsedErorr,
  setPasswordTooShortErorr,
  updateUsername,
} from '../actions/Register';
import compose from "recompose/compose";
import { translate } from "react-translate";

const RegisterContainer = (props) => {
  const { classes } = props;
  const { history } = props;
  const { username } = props;
  const { email } = props;
  const { password } = props;
  const { passwordConfirmation } = props;
  const { passwordDoesntMatchError } = props;
  const { passwordTooShortError } = props;
  const { emailAlreadyUsedError } = props;
  const { t } = props;

  const handleChange = action => (event) => {
    props.dispatch(action(event.target.value));
  };

  let errorField = null;
  if (passwordDoesntMatchError) {
    errorField = <h4 className={classes.error}>{t('PASSWORD_DONT_MATCH')}</h4>;
  }
  if (passwordTooShortError) {
    errorField = (
      <h4 className={classes.error}>{t('PASSWORD_TOO_SHORT')}</h4>
    );
  }
  if (emailAlreadyUsedError) {
    errorField = (
      <h4 className={classes.error}>{t('EMAIL_ALREADY_USED')}</h4>
    );
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      props.dispatch(setPasswordTooShortErorr());
      return;
    }
    if (password !== passwordConfirmation) {
      props.dispatch(setPasswordDoesntMatchErorr());
      return;
    }

    axios.post('/user/register', {
      username,
      email,
      password,
    }).then(() => {
      history.push('/');
    }).catch((error) => {
      if (error.response.status === 409) {
        props.dispatch(setEmailAlreadyUsedErorr());
      } else {
        global.console.log('Registration Failed: ', error);
      }
    });
  };

  return (
    <div>
      {errorField}
      <form
        className={classes.container}
        onSubmit={handleFormSubmit}
      >
        <Grid item xs={12}>
          <TextField
            required
            label={t('USERNAME')}
            type="text"
            className={classes.textField}
            margin="normal"
            value={username}
            onChange={handleChange(updateUsername)}
          />
        </Grid>
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
        <Grid item xs={12}>
          <TextField
            required
            label={t('PASSWORD_CONFIRMATION')}
            className={classes.textField}
            type="password"
            margin="normal"
            value={passwordConfirmation}
            onChange={handleChange(updatePasswordConfirmation)}
          />
        </Grid>
        <br />
        <Link to="/">{t('LOGIN_LINK')}</Link>
        <br />
        <br />
        <Button type="submit" variant="contained" color="primary">{t('REGISTER_BTN')}</Button>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  passwordDoesntMatchError: state.Register.passwordDoesntMatchError,
  passwordTooShortError: state.Register.passwordTooShortError,
  emailAlreadyUsedError: state.Register.emailAlreadyUsedError,
  username: state.Register.username,
  email: state.Register.email,
  password: state.Register.password,
  passwordConfirmation: state.Register.passwordConfirmation,
  translationsOverride: state.MenuBar.translationsOverride,
});

RegisterContainer.defaultProps = {
  classes: {},
  history: {},
  passwordDoesntMatchError: false,
  passwordTooShortError: false,
  emailAlreadyUsedError: false,
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

RegisterContainer.propTypes = {
  classes: PropTypes.shape(),
  history: PropTypes.shape(),
  dispatch: PropTypes.func.isRequired,
  passwordDoesntMatchError: PropTypes.bool,
  passwordTooShortError: PropTypes.bool,
  emailAlreadyUsedError: PropTypes.bool,
  username: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  passwordConfirmation: PropTypes.string,
  t: PropTypes.func.isRequired,
};

export default compose(
  connect(mapStateToProps),
  translate('Registration'),
)(RegisterContainer);
