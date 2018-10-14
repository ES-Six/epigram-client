import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import connect from 'react-redux/es/connect/connect';
import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField/TextField';
import axios from 'axios';
import { translate } from 'react-translate';

import {
  fetchComments,
  updateComment,
} from '../actions/PhotoDetails';

class PhotoComments extends PureComponent {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(fetchComments(match.params.id));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, match } = this.props;

    if (match.params.id !== nextProps.match.params.id) {
      dispatch(fetchComments(match.params.id));
    }
  }

  render() {
    const { classes } = this.props;
    const { isFetchingComments } = this.props;
    const { comment } = this.props;
    const { comments } = this.props;
    const { photo } = this.props;
    const { dispatch } = this.props;
    const { match } = this.props;
    const { t } = this.props;

    const handleChange = action => (event) => {
      dispatch(action(event.target.value));
    };

    const handlePostComment = (e) => {
      e.preventDefault();
      axios.post(`/photo/${photo.id}/comment`, {
        text: comment,
      }).then(() => {
        dispatch(fetchComments(match.params.id));
        dispatch(updateComment(''));
      }).catch((error) => {
        global.console.log(error);
      });
    };

    let commentsCode = null;
    if (isFetchingComments) {
      commentsCode = (
        <p>{t('LOADING')}</p>
      );
    } else if (comments.length > 0) {
      commentsCode = (
        <div className={classes.commentsContainer}>
          {
            /*
             * ESLint rule disabled for this line because
             * it's explicitely indicated here by the author of the rule
             * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md
             */
            comments.map((com, key) => (
              <span key={key /* eslint-disable-line react/no-array-index-key */}>
                {com.user.username}
                :
                {com.text}
                <br />
              </span>
            ))}
        </div>
      );
    } else {
      commentsCode = (
        <p>{t('NO_COMMENTS')}</p>
      );
    }

    return (
      <div>
        <form
          className={classes.container}
          onSubmit={handlePostComment}
        >
          <Grid item xs={12}>
            <TextField
              required
              label={t('COMMENT')}
              type="text"
              className={classes.textField}
              margin="normal"
              value={comment}
              onChange={handleChange(updateComment)}
            />
          </Grid>
          <br />
          <br />
          <Button type="submit" variant="contained" color="primary">{t('POST_BTN')}</Button>
        </form>
        {commentsCode}
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

PhotoComments.defaultProps = {
  isFetchingComments: false,
  photo: {},
  comment: '',
  comments: [],
};

PhotoComments.propTypes = {
  classes: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
  isFetchingComments: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  photo: PropTypes.shape(),
  comment: PropTypes.string,
  comments: PropTypes.arrayOf(PropTypes.shape()),
  t: PropTypes.func.isRequired,
};

export default compose(
  connect(mapStateToProps),
  translate('PhotoDetails'),
)(PhotoComments);
