import axios from 'axios';

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

export const isFetching = flag => ({
  type: 'IS_FETCHING',
  flag,
});

export const fetchCategories = (nbretry = 0) => (dispatch) => {
  dispatch(isFetching(true));
  const request = axios.get('/categories');
  return request.then(
    response => dispatch(updateCategories(response.data.result)),
    (error) => {
      if (!error.status && nbretry < 5) {
        dispatch(fetchCategories(nbretry + 1));
      }
    },
  );
};
