import { registerUserTypes } from "./register-user.types";
import { updateErrorMessage } from "../misc/misc.actions";
import { submitLogin } from "../login/login.actions";
import {environment} from "../../environment";

/** This interface is used because accountnumber isn't needed, \
 * and a checkpassword is needed for user registration. It is exported
 *  because it is also needed by the register-user component.
 */
export interface IUserInfo {
  passwordCheck: string;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  height: number;
  weight: number;
  gender: string;
}

export interface IUpdateInfo {
    accountNumber: number;
    firstName: string;
    lastName: string;
    email: string;
    height: number;
    weight: number;
}


/**
 * Similar to the updateLogin function, this is used to,
 * update info on the account registration screen.
 */
export const updateUserRegister = (info: IUserInfo) => {
  return {
    payload: {
      email: info.email,
      firstName: info.firstName,
      gender: info.gender,
      height: info.height,
      lastName: info.lastName,
      password: info.password,
      passwordCheck: info.passwordCheck,
      username: info.username,
      weight: info.weight
    },
    type: registerUserTypes.UPDATE_USER_REGISTER
  };
};

export const updateUser = (info: IUpdateInfo) => {
    return {
        payload: {
            email: info.email,
            firstName: info.firstName,
            height: info.height,
            lastName: info.lastName,
            weight: info.weight
        },
        type: registerUserTypes.UPDATE_USER
    };
};

/**
 * sends a fetch request to the server to submit a user.
 * afterwards, a login is submitted to make sure user info
 * matches the server info, and grab the accountNumber.
 */
export const registerUser = (info: IUserInfo) => (dispatch: any) => {
  const req = {
    email: info.email,
    firstname: info.firstName,
    gender: info.gender,
    height: info.height,
    lastname: info.lastName,
    password: info.password,
    username: info.username,
    weight: info.weight
  };
  fetch(environment.context + "users", {
    body: JSON.stringify(req),
    headers: { "Content-Type": "application/json" },
    method: "POST"
  })
    .then((resp: any) => resp.json())
    .then((resp: any) => {
      if (resp.status === 201) {
        dispatch(submitLogin(info.username, info.password));
      } else if (resp.status === 403) {
        dispatch(
          updateErrorMessage("This username or email is already in user.")
        );
      } else if (resp.status === 404) {
        dispatch(updateErrorMessage("Something went pretty wrong"));
      } else if (resp.status === 500) {
        dispatch(updateErrorMessage("Something went pretty wrong"));
      }
    })
    .catch((err: any) => {
      dispatch(updateErrorMessage("Something went terribly wrong"));
    });
};

export const update = (info: IUpdateInfo) => (dispatch: any) => {
    const req = {
        id: info.accountNumber,
        email: info.email,
        firstname: info.firstName,
        lastname: info.lastName,
        height: info.height,
        weight: info.weight
    };

    fetch(environment.context + "users", {
        body: JSON.stringify(req),
        headers: { "Content-Type": "application/json" },
        method: "PATCH"
    })
        .then((resp: any) => {
            if(resp.status === 202){
                return resp;
            }
            dispatch(updateErrorMessage("Unable to update information"));
        })
        .catch((err: any) => {
            dispatch(updateErrorMessage("Something went terribly wrong"));
        });

};
