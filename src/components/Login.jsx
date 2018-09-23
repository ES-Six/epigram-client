import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  textField: {
    width: '100%',
  },
  loginHorizontalCentering: {
    margin: 'auto',
    'max-width': '500px',
  },
  loginVerticalCentering: {
    height: '95vh',
    overflow: 'hidden',
  },
});

const Login = (props) => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid className={classes.loginVerticalCentering} container spacing={24}>
        <Grid className={classes.loginHorizontalCentering} item xs={12} sm={6} md={5}>
          <Paper className={classes.paper}>
            <Grid item xs={12}>
              <h3>Login</h3>
            </Grid>
            <form className={classes.container} noValidate autoComplete="off">
              <Grid item xs={12}>
                <TextField
                  required
                  label="Email"
                  type="text"
                  placeholder="your@email.com"
                  className={classes.textField}
                  margin="normal"
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
                />
              </Grid>
            </form>

            <NavLink to="/page2">
              <Button variant="contained" color="primary">Login</Button>
            </NavLink>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

Login.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Login);
