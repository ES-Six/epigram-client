import axios from 'axios';

export const updatePhotoStatistics = stats => ({
  type: 'UPDATE_STATISTICS',
  stats,
});

export const fetchStats = () => (dispatch) => {
  const request = axios.get('/categories/statistics');
  return request.then(
    response => dispatch(updatePhotoStatistics(response.data.result)),
    () => {},
  );
};
