import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../config/config.json';

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
      axios.post(`${config.api_url}/user/login`, {
        email: state.email,
        password: state.password,
      }).then((response) => {
        Cookies.set('token', response.data.result.token, { expires: 30 });
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
