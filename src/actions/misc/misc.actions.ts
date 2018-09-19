import { miscTypes } from "./misc.types";
import {loginTypes} from "../login/login.types";

export const updateErrorMessage = (message: string) => {
  return {
    payload: {
      errorMessage: message
    },
    type: miscTypes.UPDATE_ERROR_MESSAGE
  };
};
export const updateWorkText = (text: string) => {
  return {
    payload: {
      workoutTypeText: text
    },
    type: miscTypes.UPDATE_WORK_TEXT
  };
};
export const updateExerText = (text: string) => {
  return {
    payload: {
      exerciseTypeText: text
    },
    type: miscTypes.UPDATE_EXER_TEXT
  };
};

export const clearSuccess = () => (dispatch: any) => {
    dispatch({
        payload: {
            loginSuccess: false
        },
        type: loginTypes.UPDATE_LOGIN_SUCCESS
    })
}
