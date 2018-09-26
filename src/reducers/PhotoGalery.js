const PhotoGalery = (state = {
  photos: [],
  isFetching: false,
  chatMessage: '',
}, action) => {
  switch (action.type) {
    case 'UPDATE_PHOTO_TILES': {
      return {
        ...state,
        photos: action.photos,
        isFetching: false,
      };
    }
    case 'IS_FETCHING': {
      return {
        ...state,
        isFetching: action.flag,
      };
    }
    case 'UPDATE_USER_MESSAGE': {
      return {
        ...state,
        chatMessage: action.chatMessage,
      };
    }
    case 'UPDATE_CHAT': {
      return {
        ...state,
        messages: action.message,
      };
    }
    default:
      return state;
  }
};

export default PhotoGalery;
