import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreIcon from '@material-ui/icons/MoreVert';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Select from '@material-ui/core/Select';
import compose from 'recompose/compose';
import { translate } from 'react-translate';

import {
  updateMobileMenuAnchor,
  updateDesktopMenuAnchor,
  toggleDrawer,
  fetchLanguage,
} from '../actions/MenuBar';


const DesktopMenu = (props) => {
  const { classes } = props;
  const { anchorEl } = props;
  const { dispatch } = props;
  const { locale } = props;
  const { t } = props;
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

  const handleLanguageChange = (event) => {
    dispatch(fetchLanguage(event.target.value));
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
          <Select
            className={classes.languageSelector}
            value={locale}
            onChange={handleLanguageChange}
          >
            <MenuItem value="fr-fr">{t('LANGUAGE_FR')}</MenuItem>
            <MenuItem value="en-en">{t('LANGUAGE_EN')}</MenuItem>
          </Select>
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
  locale: state.MenuBar.locale,
  translationsOverride: state.MenuBar.translationsOverride,
});

DesktopMenu.defaultProps = {
  anchorEl: null,
  locale: 'fr-fr',
};

DesktopMenu.propTypes = {
  classes: PropTypes.shape({
    menuButton: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    typography: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    languageSelector: PropTypes.string.isRequired,
    grow: PropTypes.string.isRequired,
    sectionDesktop: PropTypes.string.isRequired,
    sectionMobile: PropTypes.string.isRequired,
  }).isRequired,
  anchorEl: PropTypes.shape(),
  dispatch: PropTypes.func.isRequired,
  locale: PropTypes.string,
  t: PropTypes.func.isRequired,
};

export default compose(
  connect(mapStateToProps),
  translate('DesktopMenu'),
)(DesktopMenu);
