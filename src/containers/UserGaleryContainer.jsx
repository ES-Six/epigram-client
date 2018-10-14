import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import compose from 'recompose/compose';
import { translate } from 'react-translate';

const UserGaleryContainer = (props) => {
  const { classes } = props;
  const { isFetching } = props;
  const { photos } = props;
  const { t } = props;
  let tiles = null;

  if (isFetching) {
    tiles = (
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <h3>{t('LOADING')}</h3>
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
          <h3>{t('NO_PHOTO_FOUND')}</h3>
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
                <div className={classes.photoContainer}>
                  <Link to={`/photo/${photo.id}`}>
                    <img className={classes.photos} src={`${process.env.REACT_APP_API_URL}${photo.url}`} alt={photo.title} />
                  </Link>
                </div>
                <h3 className={classes.photoTitle}>
                  <Link to={`/photo/${photo.id}`} className={classes.rmLinkStyle}>
                    {photo.title}
                  </Link>
                </h3>
                <p className={classes.photoDescription}>
                  {
                    /*
                     * ESLint rule disabled for this line because
                     * it's explicitely indicated here by the author of the rule
                     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md
                     */
                  photo.description.split('\n').map((line, key) => (
                    <span key={key /* eslint-disable-line react/no-array-index-key */}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
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

UserGaleryContainer.defaultProps = {
  photos: [],
};

UserGaleryContainer.propTypes = {
  classes: PropTypes.shape().isRequired,
  isFetching: PropTypes.bool.isRequired,
  photos: PropTypes.arrayOf(PropTypes.shape()),
  t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  photos: state.UserGalery.photos,
  isFetching: state.UserGalery.isFetching,
  translationsOverride: state.MenuBar.translationsOverride,
});

export default compose(
  connect(mapStateToProps),
  translate('AccountManagement'),
)(UserGaleryContainer);
