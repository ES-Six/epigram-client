import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import {
  toggleDrawer,
} from '../actions/MenuBar';


const MenuDrawer = (props) => {
  const { history } = props;
  const { classes } = props;
  const { openDrawer } = props;

  const sideList = (
    <div className={classes.list}>
      <ListItem button>
        <ListItemText primary="Loading..." />
      </ListItem>
    </div>
  );

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
});

MenuDrawer.defaultProps = {
  openDrawer: false,
};

MenuDrawer.propTypes = {
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
  openDrawer: PropTypes.bool,
};

export default connect(mapStateToProps)(MenuDrawer);
