import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import connect from 'react-redux/es/connect/connect';
import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField/TextField';
import Paper from '@material-ui/core/Paper/Paper';
import axios from 'axios';
import { translate } from 'react-translate';
import MenuBar from './MenuBar';
import config from '../config/config';

import {
  fetchPhoto,
  fetchComments,
  updateComment,
  updateUserLike,
  updateUserDislike,
  fetchUserOpinion,
} from '../actions/PhotoDetails';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  opinionButton: {
    margin: theme.spacing.unit,
  },
  textField: {
    width: '100%',
  },
  loginHorizontalCentering: {
    margin: 'auto',
    'max-width': '500px',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    'margin-top': '15px',
    'margin-bottom': '15px',
  },
  photo: {
    width: 'auto',
    'max-width': '100%',
    height: 'auto',
  },
  photoContainer: {
    'text-align': 'center',
    margin: '20px 15px 0px 15px',
  },
  opinionIcons: {
    'font-size': '35px',
  },
  buttonGreen: {
    background: '#4caf50',
  },
  buttonRed: {
    background: '#f50057',
  },
  commentsContainer: {
    'text-align': 'start',
    'margin-top': '20px',
  },
});

class PhotoDetails extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(fetchPhoto(match.params.id));
    dispatch(fetchComments(match.params.id));
    dispatch(fetchUserOpinion(match.params.id));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, match } = this.props;

    if (match.params.id !== nextProps.match.params.id) {
      dispatch(fetchPhoto(nextProps.match.params.id));
      dispatch(fetchComments(match.params.id));
      dispatch(fetchUserOpinion(match.params.id));
    }
  }

  render() {
    const { classes } = this.props;
    const { history } = this.props;
    const { isFetching } = this.props;
    const { isFetchingComments } = this.props;
    const { comment } = this.props;
    const { comments } = this.props;
    const { photo } = this.props;
    const { userLike } = this.props;
    const { userDislike } = this.props;
    const { dispatch } = this.props;
    const { match } = this.props;
    const { t } = this.props;

    const likeBtnClasses = [classes.opinionButton];
    const dislikeBtnClasses = [classes.opinionButton];

    if (userLike === true) {
      likeBtnClasses.push(classes.buttonGreen);
    }

    if (userDislike === true) {
      dislikeBtnClasses.push(classes.buttonRed);
    }

    const handlePhotoDeletion = () => {
      axios.delete(`/photo/${photo.id}`).then(() => {
        history.goBack();
      }).catch((error) => {
        global.console.log(error);
      });
    };

    const handleChange = action => (event) => {
      dispatch(action(event.target.value));
    };

    const handlePostComment = (e) => {
      e.preventDefault();
      axios.post(`/photo/${photo.id}/comment`, {
        text: comment,
      }).then(() => {
        dispatch(fetchComments(match.params.id));
      }).catch((error) => {
        global.console.log(error);
      });
    };

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

    let commands = null;
    if (photo.belongToUser) {
      commands = (
        <div>
          <p>{t('PHOTO_BELONG_TO_USER')}</p>
          <Button type="submit" variant="contained" color="secondary" onClick={handlePhotoDeletion}>{t('DELETE_BTN')}</Button>
        </div>
      );
    }

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

    let photoInfos = null;
    if (isFetching) {
      photoInfos = (
        <p>{t('LOADING')}</p>
      );
    } else if (Object.keys(photo).length > 0) {
      photoInfos = (
        <div className={classes.photoContainer}>
          <img src={`${config.api_url}${photo.url}`} alt={photo.title} className={classes.photo} />
          <div>
            <Button variant="fab" aria-label="Like" className={likeBtnClasses.join(' ')} onClick={handlePostOpinion('LIKE')}>
              <i className={[classes.opinionIcons, 'fas', 'fa-thumbs-up'].join(' ')} />
            </Button>
            <Button variant="fab" aria-label="Dislike" className={dislikeBtnClasses.join(' ')} onClick={handlePostOpinion('DISLIKE')}>
              <i className={[classes.opinionIcons, 'fas', 'fa-thumbs-down'].join(' ')} />
            </Button>
          </div>
          <p>
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
          {commands}
          <Paper className={classes.paper}>
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
          </Paper>
        </div>
      );
    } else {
      photoInfos = (
        <p>{t('NO_INFO')}</p>
      );
    }

    return (
      <div>
        <div>
          <MenuBar history={history} />
          {photoInfos}
        </div>
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

PhotoDetails.defaultProps = {
  isFetching: false,
  isFetchingComments: false,
  userLike: false,
  userDislike: false,
  photo: {},
  comment: '',
  comments: [],
};

PhotoDetails.propTypes = {
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
  isFetching: PropTypes.bool,
  isFetchingComments: PropTypes.bool,
  userLike: PropTypes.bool,
  userDislike: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  photo: PropTypes.shape(),
  comment: PropTypes.string,
  comments: PropTypes.arrayOf(PropTypes.shape()),
  t: PropTypes.func.isRequired,
};

export default compose(
  withStyles(styles, {
    name: 'PhotoDetails',
  }),
  connect(mapStateToProps),
  translate('PhotoDetails'),
)(PhotoDetails);
