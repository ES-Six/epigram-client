import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { translate } from 'react-translate';
import UserProfileFormContainer from '../containers/UserProfileFormContainer';
import MenuBar from './MenuBar';


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
  formHorizontalCentering: {
    margin: '20px',
    'max-width': '100%',
  },
  formVerticalCentering: {
    height: '90vh',
  },
  error: {
    color: 'red',
  },
  btnCentered: {
    margin: 'auto',
  },
});

const UserProfileForm = (props) => {
  const { classes } = props;
  const { history } = props;
  const { t } = props;

  return (
    <div className={classes.root}>
      <MenuBar history={history} />
      <Grid className={classes.formVerticalCentering} container spacing={24}>
        <Grid className={classes.formHorizontalCentering} item xs={12} sm={12} md={12}>
          <Paper className={classes.paper}>
            <Grid item xs={12}>
              <h3>{t('USER_PROFILE_FORM_TITLE')}</h3>
            </Grid>
            <UserProfileFormContainer classes={classes} history={history} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

UserProfileForm.propTypes = {
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  t: PropTypes.func.isRequired,
};

export default compose(
  withStyles(styles, {
    name: 'UserProfileForm',
  }),
  translate('UserProfileForm'),
)(UserProfileForm);
