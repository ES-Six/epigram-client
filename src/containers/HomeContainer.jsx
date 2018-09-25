import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toggleDrawer } from '../actions/MenuBar';

const HomeContainer = (props) => {
  const { classes } = props;

  const setDrawerOpened = open => () => {
    props.dispatch(toggleDrawer(open));
  };

  return (
    <Grid className={classes.loginHorizontalCentering} item xs={12} sm={6} md={6}>
      <Grid container spacing={24}>
        <Grid className={classes.buttonCentered} item md={4} sm={4} xs={12}>
          <Button onClick={setDrawerOpened(true)} className={classes.largeButton} type="submit" variant="contained" color="primary">Browse photos</Button>
        </Grid>
        <Grid className={classes.buttonCentered} item md={4} sm={4} xs={12}>
          <Button component={Link} to="/account" className={classes.largeButton} type="submit" variant="contained" color="primary">Manage your account</Button>
        </Grid>
        <Grid className={classes.buttonCentered} item md={4} sm={4} xs={12}>
          <Button className={classes.largeButton} type="submit" variant="contained" color="primary">Upload photos</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

HomeContainer.propTypes = {
  classes: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(HomeContainer);
