const PhotoGalery = (state = {
  user: {},
  isFetching: false,
}, action) => {
  switch (action.type) {
    case 'UPDATE_USER': {
      return {
        ...state,
        user: action.user,
        isFetching: false,
      };
    }
    case 'IS_FETCHING': {
      return {
        ...state,
        isFetching: action.flag,
      };
    }
    default:
      return state;
  }
};

export default PhotoGalery;
