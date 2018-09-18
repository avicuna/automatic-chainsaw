import { IWorkoutState } from ".";
import { Exercise } from "../models/exercise";
import { WorkoutType } from "../models/workout-type";
import { Workout } from "../models/workout";
import { workoutTypes } from "../actions/workout/workout.types";
/**
 * See the index.ts file for an explanation of all state properties
 */

const initialState: IWorkoutState = {
  currExercise: new Exercise("", 0, "", 0, 0, 0),
  currWorkout: new Workout(new WorkoutType("", 0, "", []), 0, [], "")
};
export const workoutReducer = (
  state: IWorkoutState = initialState,
  action: any
) => {
  switch (action.type) {
    case workoutTypes.UPDATE_WORKOUT_TYPE:
      return {
        ...state,
        currWorkout: action.payload.currWorkout
      };
    case workoutTypes.CHANGE_CURR_EXERCISE:
      return {
        ...state,
        currExercise: action.payload.currExercise
      };
    case workoutTypes.ENTER_EXERCISE:
      return {
        ...state,
        currWorkout: action.payload.currWorkout
      };
    default:
      return state;
  }
};
