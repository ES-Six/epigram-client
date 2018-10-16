const PhotoDetails = (state = {
  photo: {},
  isFetching: false,
  comments: [],
  isFetchingComments: false,
  comment: '',
  userLike: false,
  userDislike: false,
}, action) => {
  switch (action.type) {
    case 'UPDATE_PHOTO': {
      return {
        ...state,
        photo: action.photo,
        isFetching: false,
      };
    }
    case 'IS_FETCHING': {
      return {
        ...state,
        isFetching: action.flag,
      };
    }
    case 'UPDATE_COMMENTS': {
      return {
        ...state,
        comments: action.comments,
        isFetchingComments: false,
      };
    }
    case 'IS_FETCHING_COMMENTS': {
      return {
        ...state,
        isFetchingComments: action.flag,
      };
    }
    case 'UPDATE_USER_LIKE': {
      return {
        ...state,
        userLike: action.flag,
      };
    }
    case 'UPDATE_USER_DISLIKE': {
      return {
        ...state,
        userDislike: action.flag,
      };
    }
    case 'UPDATE_OPINION_COUNTERS': {
      const { photo } = state;
      if (action.opinion === 'LIKE') {
        photo.total_likes += action.value;
      } else {
        photo.total_dislikes += action.value;
      }
      return {
        ...state,
        photo,
      };
    }
    case 'UPDATE_COMMENT': {
      return {
        ...state,
        comment: action.comment,
      };
    }
    default:
      return state;
  }
};

export default PhotoDetails;
