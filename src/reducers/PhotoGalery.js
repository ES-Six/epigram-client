const PhotoGalery = (state = {
  photos: [],
  messages: [],
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
    case 'ADD_MESSAGES': {
      state.messages.push(action.message);
      return state;
    }
    case 'CLEAR_CHAT': {
      return {
        ...state,
        messages: [],
      };
    }
    case 'UPDATE_USER_MESSAGE': {
      return {
        ...state,
        chatMessage: action.chatMessage,
      };
    }
    default:
      return state;
  }
};

export default PhotoGalery;
