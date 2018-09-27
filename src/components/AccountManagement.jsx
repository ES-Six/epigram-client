import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import connect from 'react-redux/es/connect/connect';
import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid/Grid';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import UserGaleryContainer from '../containers/UserGaleryContainer';
import { fetchUser, updateUser } from '../actions/AccountManagement';
import { fetchUserPhotos, updatePhotoTiles } from '../actions/UserGalery';
import MenuBar from './MenuBar';

const md5 = require('md5');

const styles = theme => ({
  userContainer: {
    'text-align': 'center',
  },
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
  loginHorizontalCentering: {
    margin: 'auto',
    'max-width': '500px',
  },
  largeButton: {
    width: '142px',
  },
  rightButton: {
    'text-align': 'center',
    'margin-right': 'auto',
  },
  leftButton: {
    'text-align': 'center',
    'margin-left': 'auto',
  },
  container: {
    margin: '20px',
  },
  accountButton: {
    width: '150px',
  },
  rmLinkStyle: {
    'text-decoration': 'none',
    color: 'black',
  },
});

class AccountManagement extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchUser());
    dispatch(fetchUserPhotos());
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    const { user } = this.props;

    if (user.length !== nextProps.user.length) {
      dispatch(updateUser(nextProps.user));
    } else {
      dispatch(updateUser(nextProps.user));
    }

    dispatch(updatePhotoTiles(nextProps.photos));
  }

  render() {
    const { classes } = this.props;
    const { history } = this.props;
    const { isFetching } = this.props;
    const { isFetchingPhotos } = this.props;
    const { user } = this.props;

    const handleAccountDeletion = () => {
      axios.delete('/user').then(() => {
        try {
          Cookies.remove('token');
          delete axios.defaults.headers.get['X-API-KEY'];
        } catch (exception) {
          global.console.log(exception);
        }
        history.push('/');
      }).catch((error) => {
        global.console.log(error);
      });
    };

    let userInfos = null;
    if (isFetching) {
      userInfos = (
        <p>Loading...</p>
      );
    } else if (Object.keys(user).length > 0) {
      userInfos = (
        <div>
          <img src={`https://www.gravatar.com/avatar/${md5(user.email)}&s=80`} alt="User gravatar" />
          <p>
            Email :
            {user.email}
          </p>
        </div>
      );
    } else {
      userInfos = (
        <p>No info...</p>
      );
    }

    return (
      <div>
        <div className={classes.userContainer}>
          <MenuBar history={history} />
          <h3>Account management</h3>
          <p>On this page, you can delete your account and manage your photos</p>
          {userInfos}
          <Grid className={classes.loginHorizontalCentering} item xs={12} sm={8} md={8}>
            <Grid container spacing={24}>
              <Grid className={classes.leftButton} item md={4} sm={4} xs={12}>
                <Button className={classes.accountButton} onClick={handleAccountDeletion} variant="contained" color="secondary">Delete account</Button>
              </Grid>
              <Grid className={classes.rightButton} item md={4} sm={4} xs={12}>
                <Button className={classes.accountButton} component={Link} to="/upload" variant="contained" color="primary">Upload photo</Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <UserGaleryContainer classes={classes} history={history} isFetching={isFetchingPhotos} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.AccountManagement.isFetching,
  isFetchingPhotos: state.UserGalery.isFetching,
  user: state.AccountManagement.user,
  photos: state.UserGalery.photos,
});

AccountManagement.defaultProps = {
  isFetching: false,
  isFetchingPhotos: false,
  user: {},
  photos: [],
};

AccountManagement.propTypes = {
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  isFetching: PropTypes.bool,
  isFetchingPhotos: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.shape(),
  photos: PropTypes.arrayOf(PropTypes.shape()),
};

export default compose(
  withStyles(styles, {
    name: 'AccountManagement',
  }),
  connect(mapStateToProps),
)(AccountManagement);
