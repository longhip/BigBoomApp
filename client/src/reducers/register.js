import { REGISTER } from '../constants';

export default function register(state = {}, action) {
	switch(action.type){
		case REGISTER: console.log(action.payload.registrationData);
		default:
			return state;
	}
}