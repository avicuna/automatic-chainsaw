import { loginTypes } from "./login.types";
import { updateErrorMessage } from "../misc/misc.actions";

// Simply updates the username and password on the login component
export const changeUsernameAndPassword = (
  newUsername: string,
  newPassword: string
) => {
  return {
    payload: {
      password: newPassword,
      username: newUsername
    },
    type: loginTypes.UPDATE_USERNAME_AND_PASSWORD
  };
};

/**
 * Submit Login submits the username and password to the server, and excpects an error code or user to be returned.
 * a fetch is used, and a .then chain is used to send dispatches from there.
 */
export const submitLogin = (logUsername: string, logPassword: string) => (
  dispatch: any
) => {
  // This is test code to see how the resp is handled when you're having trouble connecting to the api.
  // const logUser = {
  //   body: {
  //     email: "spencedog@yahoo.com",
  //     firstName: "Spence",
  //     gender: "m",
  //     height: 67,
  //     id: 6969,
  //     lastName: "Dog",
  //     password: "pass",
  //     username: "spencedawg",
  //     weight: 140
  //   },
  //   status: 200
  // };

  fetch("http://localhost:6969/users/login", {
    body: JSON.stringify({ username: logUsername, password: logPassword }),
    headers: { "Content-Type": "application/json" },
    method: "POST"
  })
    .then((resp: any) => {
      if (resp.status === 200) {
        return resp;
      } else if (resp.status === 403) {
        dispatch(
          updateErrorMessage(`Something went pretty wrong${resp.status}`)
        );
      } else if (resp.status === 401) {
        dispatch(updateErrorMessage(`Username or password were incoorect.`));
      } else if (resp.status === 500) {
        dispatch(
          updateErrorMessage(`Something went pretty wrong${resp.status}`)
        );
      } else {
        dispatch(
          updateErrorMessage("it sent but we did something....." + resp.status)
        );
      }
    })
    .then((resp: any) => {
      const newresp = resp.json();
      window.console.log(newresp);
      return newresp;
    })
    .then((resp: any) => {
      window.console.log(resp);
      dispatch({
        payload: {
          accountNumber: resp.id,
          email: resp.email,
          firstName: resp.firstname,
          gender: resp.gender,
          height: resp.height,
          lastName: resp.lastname,
          username: resp.username,
          weight: resp.weight
        },
        type: loginTypes.SUBMIT_LOGIN
      });
      dispatch(updateErrorMessage(""));
    })
    .catch((err: any) => {
      dispatch(
        updateErrorMessage(
          `Something went terribly wrong ${err} UN: ${logUsername} PW: ${logPassword}`
        )
      );
    });
};
