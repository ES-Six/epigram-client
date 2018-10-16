const UserProfileForm = (state = {
  formError: false,
  user: {},
}, action) => {
  switch (action.type) {
    case 'UPDATE_ADRESS': {
      return {
        ...state,
        adress: action.adress,
      };
    }
    case 'UPDATE_CITY': {
      return {
        ...state,
        city: action.city,
      };
    }
    case 'UPDATE_ZIP': {
      return {
        ...state,
        zip: action.zip,
      };
    }
    case 'UPDATE_COUNTRY': {
      return {
        ...state,
        country: action.country,
      };
    }
    case 'UPDATE_NAME': {
      return {
        ...state,
        name: action.name,
      };
    }
    case 'UPDATE_FIRST_NAME': {
      return {
        ...state,
        firstName: action.firstName,
      };
    }
    case 'UPDATE_FIELDS': {
      return {
        ...state,
        name: action.name,
        firstName: action.firstName,
        adress: action.adress,
        zip: action.zip,
        city: action.city,
        country: action.country,
      };
    }
    default:
      return state;
  }
};

export default UserProfileForm;
