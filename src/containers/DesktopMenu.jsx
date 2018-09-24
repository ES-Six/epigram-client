import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';

import {
  updateMobileMenuAnchor,
  updateDesktopMenuAnchor,
} from '../actions/Menu';


const DesktopMenu = (props) => {
  const { props: { classes } } = props;
  const { props: { history } } = props;
  const { anchorEl } = props;
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    props.dispatch(updateDesktopMenuAnchor(event.currentTarget));
  };

  const handleMobileMenuOpen = (event) => {
    props.dispatch(updateMobileMenuAnchor(event.currentTarget));
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title} variant="title" color="inherit" noWrap>
          EPIgram
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
          <IconButton color="inherit">
            <Badge className={classes.margin} badgeContent={17} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
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
  anchorEl: state.Menu.anchorEl,
});

DesktopMenu.defaultProps = {
  classes: {},
  anchorEl: null,
};

DesktopMenu.propTypes = {
  props: PropTypes.shape({
    classes: PropTypes.shape().isRequired,
    history: PropTypes.shape().isRequired,
  }).isRequired,
  classes: PropTypes.shape(),
  anchorEl: PropTypes.shape(),
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(DesktopMenu);
