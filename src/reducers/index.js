import { combineReducers } from 'redux';
import Login from './Login';
import MenuBar from './MenuBar';
import Register from './Register';

export default combineReducers({
  Login,
  MenuBar,
  Register,
});
