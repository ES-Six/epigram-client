import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper/Paper';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import openSocket from 'socket.io-client';
import config from '../config/config.json';
import PhotoGaleryContainer from '../containers/PhotoGaleryContainer';
import { fetchPhotos, addMessage, updateChatMessage } from '../actions/PhotoGalery';
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
  },
});

let socket = null;

class PhotoGalery extends Component {
  constructor(props) {
    super(props);
    const { match, dispatch } = this.props;

    socket = openSocket(config.api_websocket, {
      path: '/socket.io',
      transports: ['websocket'],
      secure: true,
    });

    socket.on('connect', () => {
      global.console.log('CONNECTED');
      socket.emit('chanelSubscribe', match.params.id);
    });

    socket.on('newMessage', (data) => {
      dispatch(addMessage(data));
      global.console.log('NEW Message: ', data);
      this.forceUpdate();
    });

    socket.on('disconnect', (event) => {
      global.console.log('DISCONNECTED:', event);
    });

    global.console.log('WEBSOCKET INIT OK');
  }

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
      if (socket) {
        socket.emit('chanelSubscribe', nextProps.match.params.id);
      }
    }
  }

  componentWillUnmount() {
    socket.disconnect(true);
  }

  render() {
    const {
      classes,
      history,
      isFetching,
    } = this.props;
    const { chatMessage } = this.props;
    const { messages } = this.props;
    const { dispatch } = this.props;


    const handlePostChatMessage = (e) => {
      e.preventDefault();
      socket.emit('sendMessage', chatMessage);
      dispatch(updateChatMessage(''));
    };

    const handleChange = action => (event) => {
      dispatch(action(event.target.value));
    };

    return (
      <div>
        <MenuBar history={history} />
        <div className={classes.root}>
          <Grid id="chat-container" className={classes.chatContainer} item xs={12}>
            <Paper id="chat-paper" className={classes.chatPaper}>
              <Grid item xs={12}>
                <h3 className={classes.chatTitle}>Chat</h3>
                <form onSubmit={handlePostChatMessage}>
                  <div id="chat-messages" className={classes.chatMessagesContainer}>
                    <ul className={classes.chatMessageList}>
                      {
                        /*
                         * ESLint rule disabled for this line because
                         * it's explicitely indicated here by the author of the rule
                         * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md
                         */
                        messages.map(message => (
                          <li
                            key={message.id /* eslint-disable-line react/no-array-index-key */}
                          >
                            { message.message }
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className={classes.chatInputContainer}>
                    <TextField
                      required
                      label="Message"
                      type="text"
                      placeholder="Type a message"
                      className={[classes.chatInput, 'chat-input'].join(' ')}
                      margin="normal"
                      value={chatMessage}
                      onChange={handleChange(updateChatMessage)}
                    />
                    <Button type="submit" variant="contained" color="primary">Send</Button>
                  </div>
                </form>
              </Grid>
            </Paper>
          </Grid>
          <PhotoGaleryContainer
            classes={classes}
            history={history}
            isFetching={isFetching}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.PhotoGalery.isFetching,
  chatMessage: state.PhotoGalery.chatMessage,
  messages: state.PhotoGalery.messages,
});

PhotoGalery.defaultProps = {
  isFetching: false,
  messages: [],
  chatMessage: '',
};

PhotoGalery.propTypes = {
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  chatMessage: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.shape()),
};

export default compose(
  withStyles(styles, {
    name: 'PhotoGalery',
  }),
  connect(mapStateToProps),
)(PhotoGalery);
