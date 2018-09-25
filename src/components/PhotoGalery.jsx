import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import PhotoGaleryContainer from '../containers/PhotoGaleryContainer';
import { fetchPhotos } from '../actions/PhotoGalery';
import MenuBar from './MenuBar';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    margin: '15px',
    width: '290px',
    height: '400px',
    'text-align': 'center',
  },
  photoContainer: {
    width: '290px',
    height: '250px',
    position: 'relative',
  },
  photos: {
    width: 'auto',
    'max-width': '250px',
    'max-height': '250px',
    overflow: 'auto',
    margin: 'auto',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  photoTitle: {
    height: '28px',
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap',
    overflow: 'hidden',
  },
  photoDescription: {
    height: '75px',
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': 4,
    '-webkit-box-orient': 'vertical',
    'text-overflow': 'ellipsis',
    width: '300px',
    'word-wrap': 'break-word',
  },
});

class PhotoGalery extends Component {
  componentDidMount() {
    const {
      dispatch,
      match,
    } = this.props;

    dispatch(fetchPhotos(match.params.id));
  }

  componentWillReceiveProps(nextProps) {
    const {
      dispatch,
      match,
    } = this.props;

    if (nextProps.match.params.id !== match.params.id) {
      dispatch(fetchPhotos(nextProps.match.params.id));
    }
  }

  render() {
    const {
      classes,
      history,
      isFetching,
    } = this.props;

    return (
      <div>
        <MenuBar history={history} />
        <div className={classes.root}>
          <PhotoGaleryContainer classes={classes} history={history} isFetching={isFetching} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.PhotoGalery.isFetching,
});

PhotoGalery.defaultProps = {
  isFetching: false,
};

PhotoGalery.propTypes = {
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
};

export default compose(
  withStyles(styles, {
    name: 'PhotoGalery',
  }),
  connect(mapStateToProps),
)(PhotoGalery);
