import { IMiscState } from "./index";
import { miscTypes } from "../actions/misc/misc.types";
import { registerUserTypes } from "../actions/register-user/register-user.types";
import { infoTypes } from "../actions/info/info.types";
import { loginTypes } from "../actions/login/login.types";

const initialState: IMiscState = {
  errorMessage: "",
  exerciseTypeText: "",
  passwordCheck: "",
  workoutTypeText: "",
  workoutHistoryCalled: false,
  loginSuccess: false,
  historyPage: 0
};
export const miscReducer = (state: IMiscState = initialState, action: any) => {
  switch (action.type) {
    case infoTypes.GET_WORKOUT_HISTORY:
      return {
        ...state,
        workoutHistoryCalled: true
      };
    case registerUserTypes.UPDATE_USER_REGISTER:
      return {
        ...state,
        passwordCheck: action.payload.passwordCheck
      };
    case loginTypes.UPDATE_LOGIN_SUCCESS:
      return {
        ...state,
        loginSuccess: action.payload.loginSuccess
      };
    case miscTypes.UPDATE_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload.errorMessage
      };
    case miscTypes.UPDATE_EXER_TEXT:
      return {
        ...state,
        exerciseTypeText: action.payload.exerciseTypeText
      };
    case miscTypes.UPDATE_WORK_TEXT:
      window.console.log("asd");
      return {
        ...state,
        workoutTypeText: action.payload.workoutTypeText
      };
    default:
      return state;
  }
};
