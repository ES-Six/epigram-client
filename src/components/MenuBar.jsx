import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { fade } from '@material-ui/core/styles/colorManipulator';
import compose from 'recompose/compose';
import connect from 'react-redux/es/connect/connect';
import DesktopMenu from '../containers/DesktopMenu';
import MobileMenu from '../containers/MobileMenu';
import ProfileMenu from '../containers/ProfileMenu';
import MenuDrawer from '../containers/MenuDrawer';
import {
  fetchCategories,
  updateCategories,
} from '../actions/MenuBar';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  typography: {
    color: 'white',
    'text-decoration': 'none',
  },
  languageSelector: {
    width: '200px',
    color: 'white',
    'padding-left': '15px',
  },
});

class MenuBar extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategories());
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    const { categories } = this.props;

    if (categories.length < nextProps.categories.length) {
      dispatch(updateCategories(nextProps.categories));
    } else {
      dispatch(updateCategories(nextProps.categories));
    }
  }

  render() {
    const { classes } = this.props;
    const { history } = this.props;
    const { isFetching } = this.props;

    return (
      <div className={classes.root}>
        <DesktopMenu classes={classes} history={history} />
        <ProfileMenu history={history} />
        <MobileMenu classes={classes} history={history} />
        <MenuDrawer classes={classes} isFetching={isFetching} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.MenuBar.isFetching,
  categories: state.MenuBar.categories,
  translationsOverride: state.MenuBar.translationsOverride,
});

MenuBar.defaultProps = {
  isFetching: false,
  categories: [],
};

MenuBar.propTypes = {
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  isFetching: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape()),
};

export default compose(
  withStyles(styles, {
    name: 'MenuBar',
  }),
  connect(mapStateToProps),
)(MenuBar);
