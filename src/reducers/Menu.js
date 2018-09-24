const Menu = (state = {
  anchorEl: null,
  mobileMoreAnchorEl: null,
}, action) => {
  switch (action.type) {
    case 'UPDATE_MOBILE_MENU_ANCHOR': {
      return {
        mobileMoreAnchorEl: action.anchor,
        anchorEl: state.anchorEl,
      };
    }
    case 'UPDATE_DESKTOP_MENU_ANCHOR': {
      return {
        mobileMoreAnchorEl: state.mobileMoreAnchorEl,
        anchorEl: action.anchor,
      };
    }
    default:
      return state;
  }
};

export default Menu;
