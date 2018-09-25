import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import PropTypes from 'prop-types';
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
});

const Home = (props) => {
  const { classes } = props;
  const { history } = props;

  return (
    <div>
      <MenuBar history={history} />
      <div>
        <h2>Welcome to EPIgram</h2>
        <p>
          EPIgram is a new platform using reactJS that allow you
          to share any photos group by your favorites categories.
          <br />
          <br />
          Here is few thing you can do to begin
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
};

export default withStyles(styles)(Home);
