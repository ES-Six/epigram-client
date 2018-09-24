import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import PropTypes from 'prop-types';
import LoginContainer from '../containers/LoginContainer';

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
  error: {
    color: 'red',
  },
});

const Login = (props) => {
  const { classes } = props;
  const { history } = props;

  global.console.log('RENDER PARENT');

  return (
    <div className={classes.root}>
      <Grid className={classes.loginVerticalCentering} container spacing={24}>
        <Grid className={classes.loginHorizontalCentering} item xs={12} sm={6} md={5}>
          <Paper className={classes.paper}>
            <Grid item xs={12}>
              <h3>Login</h3>
            </Grid>
            <LoginContainer classes={classes} history={history} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

Login.propTypes = {
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Login);
