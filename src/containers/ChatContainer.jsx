import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper/Paper';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import openSocket from 'socket.io-client';
import Cookies from 'js-cookie';
import { translate } from 'react-translate';
import config from '../config/config.json';

import {
  addMessage,
  updateChatMessage,
  clearChatMessage,
} from '../actions/PhotoGalery';

let socket = null;

class ChatContainer extends PureComponent {
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
      socket.emit('chanelSubscribe', {
        chanelId: match.params.id,
        token: Cookies.get('token'),
      });
    });

    socket.on('newMessage', (data) => {
      dispatch(addMessage(data));
      global.console.log('NEW Message: ', data);
      this.forceUpdate();
    });

    socket.on('connectedToChanel', (msg) => {
      global.console.log('CONNECT STATUS:', msg);
    });

    socket.on('cannotConnectToChanel', (err) => {
      global.console.log('CONNECT ERROR:', err);
    });

    socket.on('disconnect', (event) => {
      global.console.log('DISCONNECTED:', event);
    });

    global.console.log('WEBSOCKET INIT OK');
  }

  componentWillReceiveProps(nextProps) {
    const {
      dispatch,
      match,
    } = this.props;

    if (nextProps.match.params.id !== match.params.id) {
      if (socket) {
        dispatch(updateChatMessage(''));
        dispatch(clearChatMessage());
        socket.emit('chanelSubscribe', {
          chanelId: nextProps.match.params.id,
          token: Cookies.get('token'),
        });
      }
    }
  }

  componentWillUnmount() {
    socket.disconnect(true);
  }

  render() {
    const {
      classes,
    } = this.props;
    const { chatMessage } = this.props;
    const { messages } = this.props;
    const { dispatch } = this.props;
    const { t } = this.props;

    const handlePostChatMessage = (e) => {
      e.preventDefault();
      socket.emit('sendMessage', chatMessage);
      dispatch(addMessage({
        message: chatMessage,
        username: t('YOU'),
      }));
      dispatch(updateChatMessage(''));
    };

    const handleChange = action => (event) => {
      dispatch(action(event.target.value));
    };

    return (
      <Grid id="chat-container" className={classes.chatContainer} item xs={12}>
        <Paper id="chat-paper" className={classes.chatPaper}>
          <Grid item xs={12}>
            <h3 className={classes.chatTitle}>{t('CHAT')}</h3>
            <form onSubmit={handlePostChatMessage}>
              <div id="chat-messages" className={classes.chatMessagesContainer}>
                <ul className={classes.chatMessageList}>
                  {
                    /*
                     * ESLint rule disabled for this line because
                     * it's explicitely indicated here by the author of the rule
                     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md
                     */
                    messages.map((message, index) => (
                      <div key={index /* eslint-disable-line react/no-array-index-key */}>
                        <li>
                          { message.username }
                          :
                          { message.message }
                        </li>
                        {messages.length > index + 1 ? <hr /> : null}
                      </div>
                    ))}
                </ul>
              </div>
              <div className={classes.chatInputContainer}>
                <TextField
                  required
                  label={t('MESSAGE')}
                  type="text"
                  placeholder={t('MESSAGE_PLACEHOLDER')}
                  className={[classes.chatInput, 'chat-input'].join(' ')}
                  margin="normal"
                  value={chatMessage}
                  onChange={handleChange(updateChatMessage)}
                />
                <Button type="submit" variant="contained" color="primary">{t('SEND_MESSAGE_BTN')}</Button>
              </div>
            </form>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  chatMessage: state.PhotoGalery.chatMessage,
  messages: state.PhotoGalery.messages,
});

ChatContainer.defaultProps = {
  messages: [],
  chatMessage: '',
};

ChatContainer.propTypes = {
  classes: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
  chatMessage: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.shape()),
  t: PropTypes.func.isRequired,
};

export default compose(
  connect(mapStateToProps),
  translate('PhotoGalery'),
)(ChatContainer);
