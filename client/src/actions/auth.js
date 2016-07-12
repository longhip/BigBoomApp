import { REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILED } from '../constants';

const registerSuccess = (response) => {
  return {
    type: REGISTER_SUCCESS,
    payload:{
      response: response
    }
  }
}

const registerFailed = (response) => {
  return {
    type: REGISTER_FAILED,
    payload:{
      response: response
    }
  }
}

export const register = (data) => {
  // console.log(data);
  return {
    type: REGISTER_START,
    payload:{
      data: data
    }
  }
}
