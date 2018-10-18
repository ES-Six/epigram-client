import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-translate';
import compose from 'recompose/compose';
import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import MenuBar from './MenuBar';
import HomeContainer from '../containers/HomeContainer';
import PlateformStatistics from '../containers/PlatformStatistics';

const styles = () => ({
  buttonsHorizontalCentering: {
    margin: 'auto',
    'max-width': '500px',
  },
  largeButton: {
    width: '142px',
  },
  buttonCentered: {
    'text-align': 'center',
  },
  container: {
    margin: '20px',
  },
  homeHorizontalCentering: {
    margin: 'auto',
    'margin-top': '15px',
  },
  paper: {
    overflow: 'hidden',
  },
});

const Home = (props) => {
  const { classes } = props;
  const { history } = props;
  const { t } = props;

  return (
    <div>
      <MenuBar history={history} />
      <Grid container spacing={24}>
        <Grid className={classes.homeHorizontalCentering} item xs={11} sm={10} md={10}>
          <Paper className={classes.paper}>
            <div className={classes.container}>
              <h2>{t('WELCOME_TO_EPIGRAM')}</h2>
              <p>
                {t('EPIGRAM_DESCRIPTION')}
                <br />
                <br />
                {t('WHAT_YOU_CAN_DO')}
              </p>
              <br />
              <HomeContainer classes={classes} history={history} />
              <br />
              <PlateformStatistics />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

Home.propTypes = {
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  t: PropTypes.func.isRequired,
};

export default compose(
  withStyles(styles, {
    name: 'Home',
  }),
  translate('Home'),
)(Home);
