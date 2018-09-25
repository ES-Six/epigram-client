import axios from 'axios';

export const updateUser = user => ({
  type: 'UPDATE_USER',
  user,
});

export const isFetching = flag => ({
  type: 'IS_FETCHING',
  flag,
});

export const fetchUser = () => (dispatch) => {
  dispatch(isFetching(true));
  const request = axios.get('/user');
  return request.then(
    response => dispatch(updateUser(response.data.result)),
    err => dispatch(updateUser(err)),
  );
};
