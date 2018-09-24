import axios from 'axios';

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
    case 'EMAIL_ALREADY_USED': {
      return {
        ...state,
        emailAlreadyUsedError: true,
        passwordDoesntMatchError: false,
        passwordTooShortError: false,
      };
    }
    case 'DO_REGISTRATION': {
      if (state.password.length < 6) {
        return {
          ...state,
          emailAlreadyUsedError: false,
          passwordDoesntMatchError: false,
          passwordTooShortError: true,
        };
      }
      if (state.password !== state.passwordConfirmation) {
        return {
          ...state,
          emailAlreadyUsedError: false,
          passwordDoesntMatchError: true,
          passwordTooShortError: false,
        };
      }

      axios.post('/user/register', {
        email: state.email,
        password: state.password,
      }).then((response) => {
        action.successCallback(response);
      }).catch((error) => {
        action.successCallback(error.response);
      });

      return state;
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
