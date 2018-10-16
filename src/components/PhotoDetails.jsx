import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import connect from 'react-redux/es/connect/connect';
import { translate } from 'react-translate';
import MenuBar from './MenuBar';
import PhotoInfo from '../containers/PhotoInfo';

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
  dislikesLabel: {
    color: 'red',
  },
  likesLabel: {
    color: 'green',
  },
});

const PhotoDetails = (props) => {
  const { classes } = props;
  const { history } = props;
  const { match } = props;

  return (
    <div>
      <div>
        <MenuBar history={history} />
        <PhotoInfo history={history} classes={classes} match={match} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isFetching: state.PhotoDetails.isFetching,
  isFetchingComments: state.PhotoDetails.isFetchingComments,
  photo: state.PhotoDetails.photo,
  comment: state.PhotoDetails.comment,
  userLike: state.PhotoDetails.userLike,
  userDislike: state.PhotoDetails.userDislike,
  comments: state.PhotoDetails.comments,
});

PhotoDetails.propTypes = {
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
};

export default compose(
  withStyles(styles, {
    name: 'PhotoDetails',
  }),
  connect(mapStateToProps),
  translate('PhotoDetails'),
)(PhotoDetails);
