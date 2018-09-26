const PhotoGalery = (state = {
  title: '',
  description: '',
  isUploading: false,
}, action) => {
  switch (action.type) {
    case 'UPDATE_TITLE': {
      return {
        ...state,
        title: action.title,
      };
    }
    case 'UPDATE_DESCRIPTION': {
      return {
        ...state,
        description: action.description,
      };
    }
    case 'IS_UPLOADING': {
      return {
        ...state,
        isUploading: action.flag,
      };
    }
    default:
      return state;
  }
};

export default PhotoGalery;
