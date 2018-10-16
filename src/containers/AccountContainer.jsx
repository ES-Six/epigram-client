import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import connect from 'react-redux/es/connect/connect';
import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid/Grid';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { translate } from 'react-translate';
import { fetchUser, updateUser } from '../actions/AccountManagement';
import { fetchUserPhotos, updatePhotoTiles } from '../actions/UserGalery';
import UserGaleryContainer from './UserGaleryContainer';

const md5 = require('md5');

class AccountContainer extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchUser());
    dispatch(fetchUserPhotos());
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    const { user } = this.props;

    if (Object.keys(user).length !== Object.keys(nextProps.user).length) {
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
    const { t } = this.props;

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
        <p>{t('LOADING')}</p>
      );
    } else if (Object.keys(user).length > 0) {
      userInfos = (
        <div>
          <img src={`https://www.gravatar.com/avatar/${md5(user.email)}&s=80`} alt="Gravatar" />
          <p>
            {t('EMAIl')}
            {user.email}
          </p>

          {user.name ? (
            <p>
              {t('NAME')}
              {user.name}
            </p>
          ) : null}

          {user.first_name ? (
            <p>
              {t('FIRST_NAME')}
              {user.first_name}
            </p>
          ) : null}

          {user.country ? (
            <p>
              {t('COUNTRY')}
              {user.country}
            </p>
          ) : null}

          {user.adress ? (
            <p>
              {t('ADRESS')}
              {user.adress && user.adress.length > 0 ? `${user.adress}, ` : user.adress}
              {user.zip && user.zip.length > 0 ? `${user.zip}, ` : user.zip}
              {user.city && user.city.length > 0 ? `${user.city}, ` : user.city}
              {user.country && user.country.length > 0 ? user.country : user.country}
            </p>
          ) : null}
        </div>
      );
    } else {
      userInfos = (
        <p>{t('NO_INFO')}</p>
      );
    }

    return (
      <div>
        <div className={classes.userContainer}>
          <h3>{t('TITLE')}</h3>
          <p>{t('DESCRIPTION')}</p>
          {userInfos}
          <Grid className={classes.loginHorizontalCentering} item xs={12} sm={8} md={8}>
            <Grid container spacing={24}>
              <Grid className={classes.leftButton} item md={4} sm={4} xs={12}>
                <Button className={classes.accountButton} onClick={handleAccountDeletion} variant="contained" color="secondary">{t('DELETE_ACCOUNT_BTN')}</Button>
              </Grid>
              <Grid className={classes.rightButton} item md={4} sm={4} xs={12}>
                <Button className={classes.accountButton} component={Link} to="/upload" variant="contained" color="primary">{t('UPLOAD_PHOTO_BTN')}</Button>
              </Grid>
              <Grid className={classes.rightButton} item md={4} sm={4} xs={12}>
                <Button className={classes.accountButton} component={Link} to="/update_profile" variant="contained" color="primary">{t('PROFILE_UPDATE')}</Button>
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
  translationsOverride: state.MenuBar.translationsOverride,
});

AccountContainer.defaultProps = {
  isFetching: false,
  isFetchingPhotos: false,
  user: {
    email: 'default@email.net',
  },
  photos: [],
};

AccountContainer.propTypes = {
  classes: PropTypes.shape({
    userContainer: PropTypes.string.isRequired,
    loginHorizontalCentering: PropTypes.string.isRequired,
    leftButton: PropTypes.string.isRequired,
    accountButton: PropTypes.string.isRequired,
    rightButton: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape().isRequired,
  isFetching: PropTypes.bool,
  isFetchingPhotos: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
  photos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  })),
  t: PropTypes.func.isRequired,
};

export default compose(
  connect(mapStateToProps),
  translate('AccountManagement'),
)(AccountContainer);
