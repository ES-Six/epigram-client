import axios from 'axios';

export const updateTitle = title => ({
  type: 'UPDATE_TITLE',
  title,
});

export const updateDescription = description => ({
  type: 'UPDATE_DESCRIPTION',
  description,
});

export const updateSelectedCategory = categoryId => ({
  type: 'UPDATE_SELECT_CATEGORY',
  categoryId,
});

export const isUploading = flag => ({
  type: 'IS_UPLOADING',
  flag,
});

export const uploadPhoto = (categoryId, formData, uploadSuccessCallback) => (dispatch) => {
  dispatch(isUploading(true));
  const request = axios.post(`/category/${categoryId}/photo`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return request.then(
    (response) => {
      dispatch(isUploading(false));
      uploadSuccessCallback(response);
    },
    (err) => {
      dispatch(isUploading(false));
      global.console.log(err);
    },
  );
};
