const MenuBar = (state = {
  anchorEl: null,
  mobileMoreAnchorEl: null,
  categories: [],
  openDrawer: false,
}, action) => {
  switch (action.type) {
    case 'UPDATE_MOBILE_MENU_ANCHOR': {
      return {
        ...state,
        mobileMoreAnchorEl: action.anchor,
      };
    }
    case 'UPDATE_DESKTOP_MENU_ANCHOR': {
      return {
        ...state,
        anchorEl: action.anchor,
      };
    }
    case 'UPDATE_CATEGORIES': {
      console.log(action.categories);
      return {
        ...state,
        categories: action.categories,
      };
    }
    case 'TOGGLE_DRAWER': {
      return {
        ...state,
        openDrawer: action.toggle,
      };
    }
    default:
      return state;
  }
};

export default MenuBar;
