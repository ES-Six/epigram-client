import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-translate';
import compose from 'recompose/compose';
import MenuBar from './MenuBar';
import HomeContainer from '../containers/HomeContainer';

const styles = () => ({
  loginHorizontalCentering: {
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
});

const Home = (props) => {
  const { classes } = props;
  const { history } = props;
  const { t } = props;

  return (
    <div>
      <MenuBar history={history} />
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
      </div>
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
