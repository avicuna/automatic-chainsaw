import { IInfoState } from ".";
import { WorkoutType } from "../models/workout-type";
import { Workout } from "../models/workout";
import { infoTypes } from "../actions/info/info.types";
/**
 * See the index.ts file for an explanation of all state properties
 * See the index.ts file for an explanation of all state properties, and model files for explanation of
 * objects that comprise them.  When a new action type is caught in the switch, comment the
 * actions that use this type.
 */

const initialState: IInfoState = {
  exerciseList: [],
  viewWorkout: new Workout(new WorkoutType("", 0, "", []), 0, [], ""),
  workoutHistory: [],
  workoutList: [],
  viewWorkoutId: 0
};
export const infoReducer = (state: IInfoState = initialState, action: any) => {
  switch (action.type) {
    case infoTypes.GET_WORKOUT_HISTORY:
      return {
        ...state,
        workoutHistory: action.payload.workoutHistory
      };
    case infoTypes.ZERO_VIEW_WORKOUT:
      console.log(state.viewWorkoutId);
      console.log(action.payload.viewWorkoutId);
      return {
        ...state,
        viewWorkoutId: 0
      };
    case infoTypes.GET_WORKOUT_LIST:
      return {
        ...state,
        workoutList: action.payload.workoutList
      };
    case infoTypes.GET_EXERCISE_LIST:
      return {
        ...state,
        exerciseList: action.payload.exerciseList
      };
    case infoTypes.GET_VIEW_EXERCISES:
      return {
        ...state,
        viewWorkout: action.payload.viewWorkout,
        viewWorkoutId: action.payload.viewWorkoutId
      };
    default:
      return state;
  }
};
