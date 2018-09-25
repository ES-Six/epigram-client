const Register = (state = {
  passwordDoesntMatchError: false,
  passwordTooShortError: false,
  emailAlreadyUsedError: false,
}, action) => {
  switch (action.type) {
    case 'UPDATE_EMAIL': {
      return {
        ...state,
        email: action.email,
      };
    }
    case 'UPDATE_PASSWORD': {
      return {
        ...state,
        password: action.password,
      };
    }
    case 'UPDATE_PASSWORD_CONFIRMATION': {
      return {
        ...state,
        passwordConfirmation: action.password,
      };
    }
    case 'PASSWORD_DOESNT_MATCH': {
      return {
        ...state,
        emailAlreadyUsedError: false,
        passwordDoesntMatchError: true,
        passwordTooShortError: false,
      };
    }
    case 'PASSWORD_TOO_SHORT': {
      return {
        ...state,
        emailAlreadyUsedError: false,
        passwordDoesntMatchError: false,
        passwordTooShortError: true,
      };
    }
    case 'EMAIL_ALREADY_USED': {
      return {
        ...state,
        emailAlreadyUsedError: true,
        passwordDoesntMatchError: false,
        passwordTooShortError: false,
      };
    }
    case 'LOGIN_ERROR': {
      return {
        loginError: action.error,
        password: state.password,
        email: state.email,
      };
    }
    default:
      return state;
  }
};

export default Register;
