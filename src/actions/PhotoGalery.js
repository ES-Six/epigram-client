import axios from 'axios';

export const updatePhotoTiles = photos => ({
  type: 'UPDATE_PHOTO_TILES',
  photos,
});

export const isFetching = flag => ({
  type: 'IS_FETCHING',
  flag,
});

export const addMessage = message => ({
  type: 'ADD_MESSAGES',
  message,
});

export const clearChatMessage = () => ({
  type: 'CLEAR_CHAT',
});

export const updateChatMessage = chatMessage => ({
  type: 'UPDATE_USER_MESSAGE',
  chatMessage,
});

export const fetchPhotos = (categoryId, nbretry = 0) => (dispatch) => {
  dispatch(isFetching(true));
  const request = axios.get(`/category/${categoryId}/photos`);
  return request.then(
    response => dispatch(updatePhotoTiles(response.data.result)),
    (error) => {
      if (!error.status && nbretry < 5) {
        dispatch(fetchPhotos(categoryId, nbretry + 1));
      }
    },
  );
};
