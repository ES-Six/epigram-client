import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  doLogin,
  updateEmail,
  updatePassword,
  setLoginError,
} from '../actions/Login';

const LoginContainer = (props) => {
  const { classes } = props;
  const { history } = props;
  const { loginError } = props;

  const handleChange = action => (event) => {
    props.dispatch(action(event.target.value));
  };

  let errorField = null;
  if (loginError) {
    errorField = <h4 className={classes.error}>Invalid credentials</h4>;
  }

  return (
    <div>
      {errorField}
      <form
        className={classes.container}
        onSubmit={(e) => {
          e.preventDefault();
          props.dispatch(doLogin(() => {
            global.console.log('Login success');
            history.push('/home');
          }, () => {
            global.console.log('Login error');
            props.dispatch(setLoginError(true));
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
        <br />
        <Link to="/register">You don’t have an account, create one here.</Link>
        <br />
        <br />
        <Button type="submit" variant="contained" color="primary">Login</Button>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  loginError: state.Login.loginError,
});

LoginContainer.defaultProps = {
  loginError: false,
};

LoginContainer.propTypes = {
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
  loginError: PropTypes.bool,
};

export default connect(mapStateToProps)(LoginContainer);
