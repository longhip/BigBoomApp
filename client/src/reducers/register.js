import { REGISTER } from '../constants';

export default function register(state = {}, action) {
	switch(action.type){
		case REGISTER:
      state = action.payload.registrationData
      return state;
		default:
			return state;
	}
}
