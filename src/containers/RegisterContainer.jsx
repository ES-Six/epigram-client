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

  const handleChange = action => (event) => {
    props.dispatch(action(event.target.value));
  };

  let errorField = null;
  if (passwordDoesntMatchError) {
    errorField = <h4 className={classes.error}>Error : Password doesn’t match</h4>;
  }
  if (passwordTooShortError) {
    errorField = (
      <h4 className={classes.error}>
        Error : Provided password is too short (min 6 caracters)
      </h4>
    );
  }
  if (emailAlreadyUsedError) {
    errorField = (
      <h4 className={classes.error}>
        Error : Provided email is already in used by another account
      </h4>
    );
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (password < 6) {
      props.dispatch(setPasswordTooShortErorr());
    }
    if (password !== passwordConfirmation) {
      props.dispatch(setPasswordDoesntMatchErorr());
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
            label="Username"
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
            label="Email"
            type="email"
            placeholder="your@email.com"
            className={classes.textField}
            margin="normal"
            value={email}
            onChange={handleChange(updateEmail)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="Password"
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
            label="Confirm password"
            className={classes.textField}
            type="password"
            margin="normal"
            value={passwordConfirmation}
            onChange={handleChange(updatePasswordConfirmation)}
          />
        </Grid>
        <br />
        <Link to="/">You already have an account, click here to login</Link>
        <br />
        <br />
        <Button type="submit" variant="contained" color="primary">Create account</Button>
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
};

export default connect(mapStateToProps)(RegisterContainer);
