import { combineReducers } from 'redux';
import runtime from './runtime';
import intl from './intl';
import register from './register';
import todos from './todos';

export default combineReducers({
  	runtime,
  	intl,
  	register,
  	todos
});
