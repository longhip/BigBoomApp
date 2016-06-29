import { REGISTER } from '../constants';

export const postRegister = (registrationData) => {
	return {
		type: REGISTER,
		payload:{
			registrationData: registrationData
		}
	}
}