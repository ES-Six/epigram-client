const Login = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_EMAIL': {
      const newState = state;
      newState.email = action.email;
      return newState;
    }
    case 'UPDATE_PASSWORD': {
      const newState = state;
      newState.password = action.password;
      return newState;
    }
    case 'DO_LOGIN': {
      console.log(state);
      return state;
    }
    default:
      return state;
  }
};

export default Login;
