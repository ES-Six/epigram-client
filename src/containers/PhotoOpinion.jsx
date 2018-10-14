import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import connect from 'react-redux/es/connect/connect';
import Button from '@material-ui/core/Button/Button';
import axios from 'axios';
import { translate } from 'react-translate';

import {
  updateUserLike,
  updateUserDislike,
  fetchUserOpinion,
} from '../actions/PhotoDetails';

class PhotoOpinion extends PureComponent {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(fetchUserOpinion(match.params.id));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, match } = this.props;

    if (match.params.id !== nextProps.match.params.id) {
      dispatch(fetchUserOpinion(match.params.id));
    }
  }

  render() {
    const { classes } = this.props;
    const { photo } = this.props;
    const { userLike } = this.props;
    const { userDislike } = this.props;
    const { dispatch } = this.props;

    const likeBtnClasses = [classes.opinionButton];
    const dislikeBtnClasses = [classes.opinionButton];

    if (userLike === true) {
      likeBtnClasses.push(classes.buttonGreen);
    }

    if (userDislike === true) {
      dislikeBtnClasses.push(classes.buttonRed);
    }

    const handlePostOpinion = opinion => () => {
      if ((userLike !== true && opinion === 'LIKE') || (userDislike !== true && opinion === 'DISLIKE')) {
        axios.put(`/photo/${photo.id}/opinion`, {
          opinion,
        }).then(() => {
          if (opinion === 'LIKE') {
            dispatch(updateUserLike(true));
            dispatch(updateUserDislike(false));
          } else {
            dispatch(updateUserLike(false));
            dispatch(updateUserDislike(true));
          }
        }).catch((error) => {
          global.console.log(error);
        });
      } else {
        axios.delete(`/photo/${photo.id}/opinion`).then(() => {
          dispatch(updateUserLike(false));
          dispatch(updateUserDislike(false));
        }).catch((error) => {
          global.console.log(error);
        });
      }
    };

    return (
      <div>
        <Button variant="fab" aria-label="Like" className={likeBtnClasses.join(' ')} onClick={handlePostOpinion('LIKE')}>
          <i className={[classes.opinionIcons, 'fas', 'fa-thumbs-up'].join(' ')} />
        </Button>
        <Button variant="fab" aria-label="Dislike" className={dislikeBtnClasses.join(' ')} onClick={handlePostOpinion('DISLIKE')}>
          <i className={[classes.opinionIcons, 'fas', 'fa-thumbs-down'].join(' ')} />
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.PhotoDetails.isFetching,
  isFetchingComments: state.PhotoDetails.isFetchingComments,
  photo: state.PhotoDetails.photo,
  comment: state.PhotoDetails.comment,
  userLike: state.PhotoDetails.userLike,
  userDislike: state.PhotoDetails.userDislike,
  comments: state.PhotoDetails.comments,
});

PhotoOpinion.defaultProps = {
  userLike: false,
  userDislike: false,
  photo: {},
};

PhotoOpinion.propTypes = {
  classes: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
  userLike: PropTypes.bool,
  userDislike: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  photo: PropTypes.shape(),
};

export default compose(
  connect(mapStateToProps),
  translate('PhotoDetails'),
)(PhotoOpinion);
