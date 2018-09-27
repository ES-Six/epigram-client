import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import AccountCircle from '@material-ui/icons/AccountCircle';

import {
  updateMobileMenuAnchor,
  updateDesktopMenuAnchor,
  toggleDrawer,
} from '../actions/MenuBar';


const DesktopMenu = (props) => {
  const { classes } = props;
  const { anchorEl } = props;
  const { dispatch } = props;
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    dispatch(updateDesktopMenuAnchor(event.currentTarget));
  };

  const handleMobileMenuOpen = (event) => {
    dispatch(updateMobileMenuAnchor(event.currentTarget));
  };

  const setDrawerOpened = open => () => {
    props.dispatch(toggleDrawer(open));
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton onClick={setDrawerOpened(true)} className={classes.menuButton} color="inherit" aria-label="Open drawer">
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title} variant="title" color="inherit" noWrap>
          <Link to="/home" className={classes.typography}>EPIgram</Link>
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <Input
            placeholder="Search…"
            disableUnderline
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <IconButton
            aria-owns={isMenuOpen ? 'material-appbar' : null}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </div>
        <div className={classes.sectionMobile}>
          <IconButton aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
            <MoreIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = state => ({
  anchorEl: state.MenuBar.anchorEl,
});

DesktopMenu.defaultProps = {
  anchorEl: null,
};

DesktopMenu.propTypes = {
  classes: PropTypes.shape().isRequired,
  anchorEl: PropTypes.shape(),
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(DesktopMenu);
