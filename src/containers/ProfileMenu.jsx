import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import compose from 'recompose/compose';
import { translate } from 'react-translate';

import {
  updateMobileMenuAnchor,
  updateDesktopMenuAnchor,
} from '../actions/MenuBar';

const ProfileMenu = (props) => {
  const { history } = props;
  const { anchorEl } = props;
  const { t } = props;
  const isMenuOpen = Boolean(anchorEl);

  const handleMobileMenuClose = () => {
    props.dispatch(updateMobileMenuAnchor(null));
  };

  const handleMenuClose = () => {
    props.dispatch(updateDesktopMenuAnchor(null));
    handleMobileMenuClose();
  };

  const handleClose = () => {
    props.dispatch(updateDesktopMenuAnchor(null));
    handleMobileMenuClose();
  };

  const logout = () => {
    global.console.log('LOGOUT');
    Cookies.remove('token');
    history.push('/');
  };

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem component={Link} to="/account" onClick={handleClose}>{t('ACCOUNT_MANAGEMENT')}</MenuItem>
      <MenuItem onClick={() => { handleClose(); logout(); }}>{t('LOGOUT')}</MenuItem>
    </Menu>
  );
};

const mapStateToProps = state => ({
  anchorEl: state.MenuBar.anchorEl,
  translationsOverride: state.MenuBar.translationsOverride,
});

ProfileMenu.defaultProps = {
  anchorEl: null,
};

ProfileMenu.propTypes = {
  history: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
  anchorEl: PropTypes.shape(),
  t: PropTypes.func.isRequired,
};

export default compose(
  connect(mapStateToProps),
  translate('ProfileMenu'),
)(ProfileMenu);
