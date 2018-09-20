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
      window.console.log("this is the workouthistory ");
      window.console.log(action.payload.workoutHistory);
      return {
        ...state,
        workoutHistory: action.payload.workoutHistory
      };
    case infoTypes.GET_WORKOUT_LIST:
      return {
        ...state,
        workoutList: action.payload.workoutList
      };
    case infoTypes.GET_EXERCISE_LIST:
      window.console.log("State store with exercise list");
      window.console.log(action.payload.exerciseList);
      return {
        ...state,
        exerciseList: action.payload.exerciseList
      };
    case infoTypes.GET_VIEW_EXERCISES:
      console.log(action.payload.viewWorkout);
      return {
        ...state,
        viewWorkout: action.payload.viewWorkout,
        viewWorkoutId: action.payload.viewWorkoutId
      };
    default:
      return state;
  }
};
