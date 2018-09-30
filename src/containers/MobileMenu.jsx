import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Menu from '@material-ui/core/Menu';
import Cookies from 'js-cookie';
import compose from 'recompose/compose';
import { translate } from 'react-translate';

import {
  updateMobileMenuAnchor,
} from '../actions/MenuBar';

const MobileMenu = (props) => {
  const { history } = props;
  const { mobileMoreAnchorEl } = props;
  const { t } = props;
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    props.dispatch(updateMobileMenuAnchor(null));
  };

  const logout = () => {
    global.console.log('LOGOUT');
    Cookies.remove('token');
    history.push('/');
  };

  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem component={Link} to="/account" onClick={handleMobileMenuClose}>
        <p>{t('ACCOUNT_MANAGEMENT')}</p>
      </MenuItem>
      <MenuItem onClick={() => { handleMobileMenuClose(); logout(); }}>
        <p>{t('LOGOUT')}</p>
      </MenuItem>
    </Menu>
  );
};

const mapStateToProps = state => ({
  mobileMoreAnchorEl: state.MenuBar.mobileMoreAnchorEl,
  translationsOverride: state.MenuBar.translationsOverride,
});

MobileMenu.defaultProps = {
  mobileMoreAnchorEl: null,
};

MobileMenu.propTypes = {
  history: PropTypes.shape().isRequired,
  mobileMoreAnchorEl: PropTypes.shape(),
  dispatch: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default compose(
  connect(mapStateToProps),
  translate('ProfileMenu'),
)(MobileMenu);
