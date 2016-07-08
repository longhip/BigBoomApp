import { combineReducers } from 'redux';
import {reducer as form} from 'redux-form';
import runtime from './runtime';
import intl from './intl';
import register from './register';
import todos from './todos';

export default combineReducers({
  	runtime,
  	intl,
  	register,
  	todos,
    form
});
