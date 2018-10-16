import axios from 'axios';

export const updatePhoto = photo => ({
  type: 'UPDATE_PHOTO',
  photo,
});

export const isFetching = flag => ({
  type: 'IS_FETCHING',
  flag,
});

export const updateComment = comment => ({
  type: 'UPDATE_COMMENT',
  comment,
});

export const updateComments = comments => ({
  type: 'UPDATE_COMMENTS',
  comments,
});

export const isFetchingComments = flag => ({
  type: 'IS_FETCHING_COMMENTS',
  flag,
});

export const updateUserLike = flag => ({
  type: 'UPDATE_USER_LIKE',
  flag,
});

export const updateUserDislike = flag => ({
  type: 'UPDATE_USER_DISLIKE',
  flag,
});

export const updateOpinionCounters = (opinion, value) => ({
  type: 'UPDATE_OPINION_COUNTERS',
  opinion,
  value,
});

export const fetchPhoto = photoId => (dispatch) => {
  dispatch(isFetching(true));
  const request = axios.get(`/photo/${photoId}/info`);
  return request.then(
    response => dispatch(updatePhoto(response.data.result)),
    (error) => {
      global.console.log(error);
    },
  );
};

export const fetchComments = photoId => (dispatch) => {
  dispatch(isFetchingComments(true));
  const request = axios.get(`/photo/${photoId}/comments`);
  return request.then(
    response => dispatch(updateComments(response.data.result)),
    (error) => {
      global.console.log(error);
    },
  );
};

export const fetchUserOpinion = photoId => (dispatch) => {
  dispatch(isFetchingComments(true));
  const request = axios.get(`/photo/${photoId}/opinion`);
  return request.then(
    (response) => {
      if (response.data.result.opinion === 'LIKE') {
        dispatch(updateUserLike(true));
        dispatch(updateUserDislike(false));
      } else if (response.data.result.opinion === 'DISLIKE') {
        dispatch(updateUserLike(false));
        dispatch(updateUserDislike(true));
      } else {
        dispatch(updateUserLike(false));
        dispatch(updateUserDislike(false));
      }
    },
    (error) => {
      global.console.log(error);
    },
  );
};
