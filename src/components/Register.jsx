import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { translate } from 'react-translate';
import RegisterContainer from '../containers/RegisterContainer';

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

const Register = (props) => {
  const { classes } = props;
  const { history } = props;
  const { t } = props;

  global.console.log('RENDER PARENT');

  return (
    <div className={classes.root}>
      <Grid className={classes.loginVerticalCentering} container spacing={24}>
        <Grid className={classes.loginHorizontalCentering} item xs={12} sm={6} md={5}>
          <Paper className={classes.paper}>
            <Grid item xs={12}>
              <h3>{t('REGISTER')}</h3>
            </Grid>
            <RegisterContainer classes={classes} history={history} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

Register.propTypes = {
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  t: PropTypes.func.isRequired,
};

export default compose(
  withStyles(styles, {
    name: 'Register',
  }),
  translate('Registration'),
)(Register);
