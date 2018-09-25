import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import config from '../config/config';

const PhotoGaleryContainer = (props) => {
  const { classes } = props;
  const { history } = props;
  const { isFetching } = props;
  const { photos } = props;
  let tiles = null;

  global.console.log('CHILD RENDERED');

  if (isFetching) {
    tiles = (
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <h3>Loading...</h3>
        </Grid>
      </Grid>);
  } else if (!isFetching && photos.length === 0) {
    tiles = (
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <h3>This category has no photo yet</h3>
        </Grid>
      </Grid>);
  } else {
    tiles = (
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          {photos.map(photo => (
            <Grid key={photo.id} item>
              <Paper
                className={classes.paper}
              >
                <img className={classes.photos} src={`${config.api_url}${photo.url}`} alt={photo.title} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>);
  }

  return (
    <div>
      {tiles}
    </div>
  );
};

PhotoGaleryContainer.defaultProps = {
  photos: [],
};

PhotoGaleryContainer.propTypes = {
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  isFetching: PropTypes.bool.isRequired,
  photos: PropTypes.arrayOf(PropTypes.shape()),
};

const mapStateToProps = state => ({
  photos: state.PhotoGalery.photos,
  isFetching: state.PhotoGalery.isFetching,
});

export default connect(mapStateToProps)(PhotoGaleryContainer);
