import { infoTypes } from "./info.types";
import { updateErrorMessage } from "../misc/misc.actions";
import { WorkoutType } from "../../models/workout-type";
import { ExerciseType } from "../../models/exercise-type";
import { WorkoutSnapshot } from "../../models/workout-snapshot";
import { Workout } from "../../models/workout";
import { Exercise } from "../../models/exercise";

export const getWorkoutHistory = (
  userId: number,
  workoutList: WorkoutType[]
) => (dispatch: any) => {
  fetch(`http://localhost:6969/users/${userId}/workouts`, {
    headers: { "Content-Type": "application/json" },
    method: "GET"
  })
    .then((resp: any) => {
      if (resp.status === 200) {
        return resp.json();
      } else if (resp.status === 401) {
        dispatch(
          updateErrorMessage(`Something went pretty wrong${resp.status}`)
        );
      } else if (resp.status === 500) {
        dispatch(
          updateErrorMessage(`Something went pretty wrong${resp.status}`)
        );
      }
    })
    .then((resp: any) => {
      const yeah: WorkoutSnapshot[] = resp.map((snapshot: any) => {
        const newType = workoutList.find((type: WorkoutType) => {
          return snapshot.workoutId === type.id;
        });
        return {
          id: snapshot.id,
          order: snapshot.number,
          date: snapshot.sqlDate,
          type: newType
        };
      });
      dispatch({
        payload: {
          workoutHistory: yeah
        },
        type: infoTypes.GET_WORKOUT_HISTORY
      });
    })
    .catch((err: any) => {
      dispatch(
        updateErrorMessage(`Something went terribly wrong "  ${err}  "`)
      );
    });
};

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
      return newresp;
    })
    .then((resp: any) => {
      const newWorkoutList: WorkoutType[] = resp.map((wt: any) => {
        return new WorkoutType(wt.name, wt.id, wt.description, []);
      });
      dispatch({
        payload: {
          workoutList: newWorkoutList
        },
        type: infoTypes.GET_WORKOUT_LIST
      });
      dispatch(updateErrorMessage(""));
      return newWorkoutList;
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
        setInterval({}, 1000);
        return resp.json();
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
      const newExerciseList: ExerciseType[] = resp.map((et: any) => {
        return new ExerciseType(et.name, et.id, et.description);
      });
      dispatch({
        payload: {
          exerciseList: newExerciseList
        },
        type: infoTypes.GET_EXERCISE_LIST
      });
      dispatch(updateErrorMessage(""));
    })
    .catch((err: any) => {
      dispatch(
        updateErrorMessage(`Something went terribly wrong "  ${err}  "`)
      );
    });
};
export const getUserExerciseList = (
  workoutId: number,
  exerciseList: ExerciseType[],
  viewWorkout: Workout
) => (dispatch: any) => {
  fetch(`http://localhost:6969/exercise-list/workout/${+workoutId}`, {
    headers: { "Content-Type": "application/json" },
    // mode: "no-cors",
    method: "GET"
  })
    .then((resp: any) => {
      if (resp.status === 200) {
        return resp.json();
      } else if (resp.status === 401) {
        dispatch(
          updateErrorMessage(`Something went pretty wrong${resp.status}`)
        );
      } else if (resp.status === 500) {
        dispatch(
          updateErrorMessage(`Something went pretty wrong${resp.status}`)
        );
      }
    })
    .then((resp: any) => {
      const exercises: Exercise[] = resp.map((springExercise: any) => {
        const thisType =
          exerciseList.find(exerType => {
            return exerType.id === springExercise.exerciseId;
          }) || exerciseList[0];
        return new Exercise(
          thisType.name,
          thisType.id,
          thisType.description,
          springExercise.weight,
          springExercise.sets,
          springExercise.reps
        );
      });
      const newViewWorkout = new Workout(
        viewWorkout.type,
        viewWorkout.order,
        exercises,
        viewWorkout.date
      );
      dispatch({
        payload: {
          viewWorkout: newViewWorkout,
          viewWorkoutId: workoutId
        },
        type: infoTypes.GET_VIEW_EXERCISES
      });
    });
};

export const zeroViewWorkout = () => {
  return {
    payload: {
      viewWorkoutId: 0
    },
    type: infoTypes.ZERO_VIEW_WORKOUT
  };
};
