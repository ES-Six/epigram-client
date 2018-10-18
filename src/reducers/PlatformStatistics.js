const PlatformStatistics = (state = {
  stats: [],
}, action) => {
  switch (action.type) {
    case 'UPDATE_STATISTICS': {
      return {
        ...state,
        stats: action.stats,
      };
    }
    default:
      return state;
  }
};

export default PlatformStatistics;
