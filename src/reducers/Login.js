const Login = (state = { loginError: false }, action) => {
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
    case 'LOGIN_ERROR': {
      return {
        ...state,
        loginError: action.error,
      };
    }
    default:
      return state;
  }
};

export default Login;
