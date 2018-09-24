import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MenuBar from './MenuBar';

const styles = () => ({
  root: {
    width: '100%',
  },
});

const PhotoGalery = (props) => {
  const { classes } = props;
  const { history } = props;
  const { match } = props;

  return (
    <div>
      <MenuBar history={history} />
      <div className={classes.root}>
        <p>
          Category (n°
          {match.params.id}
          )detected !
        </p>
      </div>
    </div>
  );
};

PhotoGalery.propTypes = {
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
};

export default withStyles(styles)(PhotoGalery);
