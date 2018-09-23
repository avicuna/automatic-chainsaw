import { IUserState } from ".";
import { loginTypes } from "../actions/login/login.types";
import { registerUserTypes } from "../actions/register-user/register-user.types";
import { logoutTypes } from "../actions/logout/logout.types";
/**
 * See the index.ts file for an explanation of all state properties
 * See the index.ts file for an explanation of all state properties, and model files for explanation of
 * objects that comprise them.  When a new action type is caught in the switch, comment the
 * actions that use this type.
 */

const initialState: IUserState = {
  accountNumber: 0,
  email: "",
  firstName: "",
  gender: "",
  height: 0,
  lastName: "",
  password: "",
  username: "",
  weight: 0
};
export const userReducer = (state: IUserState = initialState, action: any) => {
  switch (action.type) {
    case loginTypes.UPDATE_USERNAME_AND_PASSWORD:
      return {
        ...state,
        password: action.payload.password,
        username: action.payload.username
      };

    case loginTypes.SUBMIT_LOGIN:
      window.console.log(+action.payload.accountNumber);
      return {
        ...state,
        accountNumber: +action.payload.accountNumber,
        email: action.payload.email,
        firstName: action.payload.firstName,
        gender: action.payload.gender,
        height: action.payload.height,
        lastName: action.payload.lastName,
        password: action.payload.password,
        username: action.payload.username,
        weight: action.payload.weight
      };

    case registerUserTypes.UPDATE_USER_REGISTER:
      return {
        ...state,
        email: action.payload.email,
        firstName: action.payload.firstName,
        gender: action.payload.gender,
        height: action.payload.height,
        lastName: action.payload.lastName,
        password: action.payload.password,
        username: action.payload.username,
        weight: action.payload.weight
      };
      case registerUserTypes.UPDATE_USER:
        return {
            ...state,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            email: action.payload.email,
            height: action.payload.height,
            weight: action.payload.weight,
        }

    case registerUserTypes.SUBMIT_REGISTRATION:
      return {
        ...state,
        accountNumber: action.payload.accountNumber
      };
    case logoutTypes.Logout_User:
      return {
        accountNumber: action.payload.accountNumber,
        email: action.payload.email,
        firstName: action.payload.firstName,
        gender: action.payload.gender,
        height: action.payload.height,
        lastName: action.payload.lastName,
        password: action.payload.password,
        username: action.payload.username,
        weight: action.payload.weight
      };
    default:
      return state;
  }
};
