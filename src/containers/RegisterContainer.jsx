import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  doRegistration,
  updateEmail,
  updatePassword,
  updatePasswordConfirmation,
  setEmailAlreadyUsedErorr,
} from '../actions/Register';

const RegisterContainer = (props) => {
  const { classes } = props;
  const { history } = props;
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

  return (
    <div>
      {errorField}
      <form
        className={classes.container}
        onSubmit={(e) => {
          e.preventDefault();
          props.dispatch(doRegistration((result) => {
            if (result.status === 409) {
              props.dispatch(setEmailAlreadyUsedErorr());
            } else {
              global.console.log('Registration success');
              history.push('/');
            }
          }));
        }}
      >
        <Grid item xs={12}>
          <TextField
            required
            label="Email"
            type="email"
            placeholder="your@email.com"
            className={classes.textField}
            margin="normal"
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
});

RegisterContainer.defaultProps = {
  classes: {},
  history: {},
  passwordDoesntMatchError: false,
  passwordTooShortError: false,
  emailAlreadyUsedError: false,
};

RegisterContainer.propTypes = {
  classes: PropTypes.shape(),
  history: PropTypes.shape(),
  dispatch: PropTypes.func.isRequired,
  passwordDoesntMatchError: PropTypes.bool,
  passwordTooShortError: PropTypes.bool,
  emailAlreadyUsedError: PropTypes.bool,
};

export default connect(mapStateToProps)(RegisterContainer);
