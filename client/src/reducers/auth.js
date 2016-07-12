import { REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILED, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT_SUCCESS, LOGOUT_FAILED} from '../constants';

export default function auth(state = {}, action){
  switch(action.type){
    case REGISTER_START: {
      // state = action.payload;
      // return state;
      console.log(action.payload);
    }
    case REGISTER_SUCCESS: {
      state = action.payload;
      return state;
    }
    case REGISTER_FAILED: {
      state = action.payload;
      return state;
    }
    case LOGIN_SUCCESS: {
      state = action.payload;
      return state;
    }
    case LOGIN_FAILED: {
      state = action.payload;
      return state;
    }
    case LOGOUT_SUCCESS: {
      state = action.payload;
      return state;
    }
    case LOGOUT_FAILED: {
      state = action.payload;
      return state;
    }
    default:
      return state;
  }
}

