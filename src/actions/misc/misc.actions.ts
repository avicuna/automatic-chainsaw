import { miscTypes } from "./misc.types";
import { loginTypes } from "../login/login.types";
import { WorkoutSnapshot } from "../../models/workout-snapshot";

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

export const changeHistoryPage = (
  page: number,
  type: string,
  history: WorkoutSnapshot[]
) => {
  switch (type) {
    case "fwd":
      return {
        payload: {
          historyPage: Math.min(page + 1, Math.ceil(history.length / 10) - 1)
        },
        type: miscTypes.CHANGE_HISTORY_PAGE
      };
    case "bwd":
      return {
        payload: {
          historyPage: Math.max(0, page - 1)
        },
        type: miscTypes.CHANGE_HISTORY_PAGE
      };
    case "lst":
      return {
        payload: {
          historyPage: Math.ceil(history.length / 10) - 1
        },
        type: miscTypes.CHANGE_HISTORY_PAGE
      };
    case "fst":
      return {
        payload: {
          historyPage: 0
        },
        type: miscTypes.CHANGE_HISTORY_PAGE
      };
    default:
      return {
        payload: {
          historyPage: page
        },
        type: miscTypes.CHANGE_HISTORY_PAGE
      };
  }
};
export const clearSuccess = () => (dispatch: any) => {
  dispatch({
    payload: {
      loginSuccess: false
    },
    type: loginTypes.UPDATE_LOGIN_SUCCESS
  });
};
