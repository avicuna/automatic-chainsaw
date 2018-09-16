import { infoTypes } from "./info.types";
import { updateErrorMessage } from "../misc/misc.actions";
import { WorkoutType } from "../../models/workout-type";
import { ExerciseType } from "../../models/exercise-type";

export const getWorkoutList = () => (dispatch: any) => {
  fetch("http://localhost:6969/workout", {
    headers: { "Content-Type": "application/json" },
    method: "GET"
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
      const newWorkoutList: WorkoutType = resp.map((wt: any) => {
        return new WorkoutType(wt.name, wt.id, wt.description, []);
      });
      window.console.log(newWorkoutList);
      dispatch({
        payload: {
          workoutList: newWorkoutList
        },
        type: infoTypes.GET_WORKOUT_LIST
      });
      dispatch(updateErrorMessage(""));
    })
    .catch((err: any) => {
      dispatch(updateErrorMessage(`Something went terribly wrong`));
    });
};

export const getExerciseList = () => (dispatch: any) => {
  fetch("http://localhost:6969/exercise", {
    headers: { "Content-Type": "application/json" },
    method: "GET"
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
      const newExerciseList: WorkoutType[] = resp.map((et: any) => {
        return new ExerciseType(et.name, et.id, et.description);
      });
      window.console.log(newExerciseList);
      dispatch({
        payload: {
          exerciseList: newExerciseList
        },
        type: infoTypes.GET_EXERCISE_LIST
      });
      dispatch(updateErrorMessage(""));
    })
    .catch((err: any) => {
      dispatch(updateErrorMessage(`Something went terribly wrong`));
    });
};