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
    height: '100%',
    color: theme.palette.text.secondary,
  },
  photos: {
    width: '350px',
    height: '350px',
  },
});

class PhotoGalery extends Component {
  componentDidMount() {
    const {
      dispatch,
      match,
    } = this.props;

    dispatch(fetchPhotos(match.params.id));
    console.log('Refresh at mount');
  }

  componentWillReceiveProps(nextProps) {
    const {
      dispatch,
      match,
    } = this.props;

    if (nextProps.match.params.id !== match.params.id) {
      dispatch(fetchPhotos(nextProps.match.params.id));
      console.log('Refresh needed');
    }
  }

  render() {
    const {
      classes,
      history,
      isFetching,
    } = this.props;

    global.console.log('PARENT RENDERED');

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
    name: 'PhotoGalery'
  }),
  connect(mapStateToProps),
)(PhotoGalery);
