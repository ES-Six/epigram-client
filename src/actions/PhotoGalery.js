import axios from 'axios';

export const updatePhotoTiles = photos => ({
  type: 'UPDATE_PHOTO_TILES',
  photos,
});

export const isFetching = flag => ({
  type: 'IS_FETCHING',
  flag,
});

export const fetchPhotos = categoryId => (dispatch) => {
  dispatch(isFetching(true));
  const request = axios.get(`/category/${categoryId}/photos`);
  return request.then(
    response => dispatch(updatePhotoTiles(response.data.result)),
    err => dispatch(updatePhotoTiles(err)),
  );
};
