import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import {
  toggleDrawer,
} from '../actions/MenuBar';

const MenuDrawer = (props) => {
  const { classes } = props;
  const { openDrawer } = props;
  const { categories } = props;
  const { isFetching } = props;

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
            <ListItemText primary={category.name} />
          </ListItem>
        ))}
      </div>
    );
  }

  const setDrawerOpened = open => () => {
    props.dispatch(toggleDrawer(open));
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
};

const mapStateToProps = state => ({
  openDrawer: state.MenuBar.openDrawer,
  categories: state.MenuBar.categories,
  isFetching: state.MenuBar.isFetching,
});

MenuDrawer.defaultProps = {
  openDrawer: false,
  categories: [],
};

MenuDrawer.propTypes = {
  classes: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
  openDrawer: PropTypes.bool,
  categories: PropTypes.arrayOf(PropTypes.shape()),
  isFetching: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(MenuDrawer);
