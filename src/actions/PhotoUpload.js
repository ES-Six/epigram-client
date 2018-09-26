import axios from 'axios';

export const updateTitle = title => ({
  type: 'UPDATE_TITLE',
  title,
});

export const updateDescription = description => ({
  type: 'UPDATE_DESCRIPTION',
  description,
});

export const isUploading = flag => ({
  type: 'IS_UPLOADING',
  flag,
});

export const uploadPhoto = categoryId => (dispatch) => {
  dispatch(isUploading(true));
  const request = axios.post(`/category/${categoryId}/photo`);
  return request.then(
    response => global.console.log(response.data),
    err => global.console.log(err),
  );
};
