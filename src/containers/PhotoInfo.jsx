import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import connect from 'react-redux/es/connect/connect';
import Button from '@material-ui/core/Button/Button';
import Paper from '@material-ui/core/Paper/Paper';
import axios from 'axios';
import { translate } from 'react-translate';
import PhotoComments from './PhotoComments';
import PhotoOpinion from './PhotoOpinion';

import {
  fetchPhoto,
} from '../actions/PhotoDetails';

class PhotoInfo extends PureComponent {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(fetchPhoto(match.params.id));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, match } = this.props;

    if (match.params.id !== nextProps.match.params.id) {
      dispatch(fetchPhoto(nextProps.match.params.id));
    }
  }

  render() {
    const { classes } = this.props;
    const { history } = this.props;
    const { isFetching } = this.props;
    const { photo } = this.props;
    const { match } = this.props;
    const { t } = this.props;

    const handlePhotoDeletion = () => {
      axios.delete(`/photo/${photo.id}`).then(() => {
        history.goBack();
      }).catch((error) => {
        global.console.log(error);
      });
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

    let photoInfos = null;
    if (isFetching) {
      photoInfos = (
        <p>{t('LOADING')}</p>
      );
    } else if (Object.keys(photo).length > 0) {
      photoInfos = (
        <div className={classes.photoContainer}>
          <img src={`${process.env.REACT_APP_API_URL}${photo.url}`} alt={photo.title} className={classes.photo} />
          <PhotoOpinion history={history} classes={classes} match={match} />
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
            <PhotoComments history={history} classes={classes} match={match} />
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
        {photoInfos}
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

PhotoInfo.defaultProps = {
  isFetching: false,
  photo: {},
};

PhotoInfo.propTypes = {
  classes: PropTypes.shape({
    photoContainer: PropTypes.string.isRequired,
    paper: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
  isFetching: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  photo: PropTypes.shape({
    id: PropTypes.number,
    url: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  t: PropTypes.func.isRequired,
};

export default compose(
  connect(mapStateToProps),
  translate('PhotoDetails'),
)(PhotoInfo);
