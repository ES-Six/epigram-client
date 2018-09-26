import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import config from '../config/config';
import {
  updateChatMessage,
} from '../actions/PhotoGalery';

const PhotoGaleryContainer = (props) => {
  const { classes } = props;
  const { history } = props;
  const { isFetching } = props;
  const { photos } = props;
  const { chatMessage } = props;
  const { dispatch } = props;
  let tiles = null;

  const handlePostChatMessage = (e) => {
    e.preventDefault();
  };

  const handleChange = action => (event) => {
    dispatch(action(event.target.value));
  };

  if (isFetching) {
    tiles = (
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <h3>Loading...</h3>
        </Grid>
      </Grid>);
  } else if (!isFetching && photos.length === 0) {
    tiles = (
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <h3>This category has no photo yet</h3>
        </Grid>
      </Grid>);
  } else {
    tiles = (
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          {photos.map(photo => (
            <Grid key={photo.id} className="photoGrid" item>
              <Paper
                className={classes.paper}
              >
                <div className={classes.photoContainer}>
                  <img className={classes.photos} src={`${config.api_url}${photo.url}`} alt={photo.title} />
                </div>
                <h3 className={classes.photoTitle}>{photo.title}</h3>
                <p className={classes.photoDescription}>
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
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>);
  }

  return (
    <div>
      <Grid id="chat-container" className={classes.chatContainer} item xs={12}>
        <Paper id="chat-paper" className={classes.chatPaper}>
          <Grid item xs={12}>
            <h3 className={classes.chatTitle}>Chat</h3>
            <form onSubmit={handlePostChatMessage}>
              <div id="chat-messages" className={classes.chatMessagesContainer}>
                <ul className={classes.chatMessageList}>
                  <li>User : Hellooooo</li>
                  <li>You : Helloooooo</li>
                  <li>User : Hellooooo ooooo ooooo ooooo</li>
                  <li>User : Hellooooo ooooo ooooo ooooo</li>
                  <li>User : Hellooooo ooooo ooooo ooooo</li>
                  <li>User : Hellooooo ooooo ooooo ooooo</li>
                  <li>User : Hellooooo ooooo ooooo ooooo</li>
                  <li>User : Hellooooo ooooo ooooo ooooo</li>
                  <li>User : Hellooooo ooooo ooooo ooooo</li>
                  <li>User : Hellooooo ooooo ooooo ooooo</li>
                  <li>User : Hellooooo ooooo ooooo ooooo</li>
                  <li>User : Hellooooo ooooo ooooo ooooo</li>
                  <li>User : Hellooooo ooooo ooooo ooooo</li>
                  <li>User : Hellooooo ooooo ooooo ooooo</li>
                  <li>User : Hellooooo ooooo ooooo ooooo</li>
                  <li>User : Hellooooo ooooo ooooo ooooo</li>
                  <li>User : Hellooooo ooooo ooooo ooooo</li>
                  <li>User : Hellooooo ooooo ooooo ooooo</li>
                  <li>User : Hellooooo ooooo ooooo ooooo</li>
                  <li>User : Hellooooo ooooo ooooo ooooo</li>
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
      {tiles}
    </div>
  );
};

PhotoGaleryContainer.defaultProps = {
  photos: [],
  chatMessage: '',
};

PhotoGaleryContainer.propTypes = {
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  photos: PropTypes.arrayOf(PropTypes.shape()),
  chatMessage: PropTypes.string,
};

const mapStateToProps = state => ({
  photos: state.PhotoGalery.photos,
  isFetching: state.PhotoGalery.isFetching,
  chatMessage: state.PhotoGalery.chatMessage,
});

export default connect(mapStateToProps)(PhotoGaleryContainer);
