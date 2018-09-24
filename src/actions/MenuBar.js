export const updateMobileMenuAnchor = anchor => ({
  type: 'UPDATE_MOBILE_MENU_ANCHOR',
  anchor,
});

export const updateDesktopMenuAnchor = anchor => ({
  type: 'UPDATE_DESKTOP_MENU_ANCHOR',
  anchor,
});

export const updateCategories = categories => ({
  type: 'UPDATE_CATEGORIES',
  categories,
});

export const toggleDrawer = toggle => ({
  type: 'TOGGLE_DRAWER',
  toggle,
});
