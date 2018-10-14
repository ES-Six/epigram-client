import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import compose from 'recompose/compose';
import { translate } from 'react-translate';

import {
  fetchCategories,
  toggleDrawer, updateCategories,
} from '../actions/MenuBar';


class MenuDrawer extends PureComponent {
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
    const { openDrawer } = this.props;
    const { categories } = this.props;
    const { isFetching } = this.props;
    const { dispatch } = this.props;
    const { t } = this.props;

    let sideList = null;
    if (isFetching) {
      sideList = (
        <div className={classes.list}>
          <ListItem button>
            <ListItemText primary="Loading..." />
          </ListItem>
        </div>
      );
    } else if (!isFetching && categories.length === 0) {
      sideList = (
        <div className={classes.list}>
          <ListItem button>
            <ListItemText primary="No category found" />
          </ListItem>
        </div>
      );
    } else {
      sideList = (
        <div className={classes.list}>
          {categories.map(category => (
            <ListItem key={category.id} button component={Link} to={`/categories/${category.id}`}>
              <ListItemText primary={t(category.name)} />
            </ListItem>
          ))}
        </div>
      );
    }

    const setDrawerOpened = open => () => {
      dispatch(toggleDrawer(open));
    };

    return (
      <div>
        <Drawer open={openDrawer} onClose={setDrawerOpened(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={setDrawerOpened(false)}
            onKeyDown={setDrawerOpened(false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  openDrawer: state.MenuBar.openDrawer,
  categories: state.MenuBar.categories,
  isFetching: state.MenuBar.isFetching,
  translationsOverride: state.MenuBar.translationsOverride,
});

MenuDrawer.defaultProps = {
  openDrawer: false,
  isFetching: false,
  categories: [],
};

MenuDrawer.propTypes = {
  classes: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
  openDrawer: PropTypes.bool,
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })),
  isFetching: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

export default compose(
  connect(mapStateToProps),
  translate('MenuDrawer'),
)(MenuDrawer);
