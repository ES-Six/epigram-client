import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';

import {
  updateMobileMenuAnchor,
  updateDesktopMenuAnchor,
} from '../actions/MenuBar';


const ProfileMenu = (props) => {
  const { history } = props;
  const { anchorEl } = props;
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

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleClose}>Account managment</MenuItem>
      <MenuItem onClick={handleClose}>Logout</MenuItem>
    </Menu>
  );
};

const mapStateToProps = state => ({
  anchorEl: state.MenuBar.anchorEl,
});

ProfileMenu.defaultProps = {
  anchorEl: null,
};

ProfileMenu.propTypes = {
  history: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
  anchorEl: PropTypes.shape(),
};

export default connect(mapStateToProps)(ProfileMenu);
