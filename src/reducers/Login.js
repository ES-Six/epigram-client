import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../config/config.json';

const Login = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_EMAIL': {
      return {
        password: state.password,
        email: action.email,
      };
    }
    case 'UPDATE_PASSWORD': {
      return {
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
    default:
      return state;
  }
};

export default Login;
