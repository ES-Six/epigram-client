import axios from 'axios';
import localeFR from '../i18n/fr-fr';
import localeEN from '../i18n/en-en';

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

export const updateLanguage = (locale, translationsOverride) => ({
  type: 'UPDATE_LANGUAGE',
  locale,
  translationsOverride,
});

export const fetchLanguage = locale => (dispatch) => {
  const locales = [localeFR, localeEN];
  for (let i = 0; i < locales.length; i += 1) {
    if (locales[i].locale === locale) {
      dispatch(updateLanguage(locale, locales[i]));
    }
  }
};

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
