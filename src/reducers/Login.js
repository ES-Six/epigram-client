import axios from 'axios';
import Cookies from 'js-cookie';

const Login = (state = { loginError: false }, action) => {
  switch (action.type) {
    case 'UPDATE_EMAIL': {
      return {
        ...state,
        password: state.password,
        email: action.email,
      };
    }
    case 'UPDATE_PASSWORD': {
      return {
        ...state,
        email: state.email,
        password: action.password,
      };
    }
    case 'DO_LOGIN': {
      axios.post('/user/login', {
        email: state.email,
        password: state.password,
      }).then((response) => {
        Cookies.set('token', response.data.result.token, { expires: 30 });
        axios.defaults.headers.get['X-API-KEY'] = response.data.result.token;
        action.successCallback();
      }).catch(() => {
        action.errorCallback();
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

export default Login;
