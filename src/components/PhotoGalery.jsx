import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { translate } from 'react-translate';
import PhotoGaleryContainer from '../containers/PhotoGaleryContainer';
import ChatContainer from '../containers/ChatContainer';
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
  chatPaper: {
    height: '400px',
    margin: '15px',
    width: '91%',
    'margin-left': 'auto',
    'margin-right': 'auto',
  },
  chatTitle: {
    margin: '15px',
    'text-align': 'center',
  },
  chatInputContainer: {
    width: '100%',
    margin: '5px',
    display: 'inline-block',
    'text-align': 'center',
  },
  chatInput: {
    width: '80%',
    'margin-right': '10px',
    'margin-left': 'auto',
  },
  chatMessagesContainer: {
    height: '280px',
    'overflow-y': 'auto',
  },
  chatMessageList: {
    'list-style': 'none',
    padding: 0,
    'margin-left': '15px',
    'margin-right': '15px',
    'word-wrap': 'break-word',
  },
  rmLinkStyle: {
    'text-decoration': 'none',
    color: 'black',
  },
});

const PhotoGalery = (props) => {
  const {
    classes,
    history,
    match,
  } = props;

  return (
    <div>
      <MenuBar history={history} />
      <div className={classes.root}>
        <ChatContainer match={match} classes={classes} />
        <PhotoGaleryContainer classes={classes} history={history} match={match} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  chatMessage: state.PhotoGalery.chatMessage,
  messages: state.PhotoGalery.messages,
});

PhotoGalery.propTypes = {
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
};

export default compose(
  withStyles(styles, {
    name: 'PhotoGalery',
  }),
  connect(mapStateToProps),
  translate('PhotoGalery'),
)(PhotoGalery);
