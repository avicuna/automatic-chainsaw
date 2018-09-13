import { IInfoState } from ".";
import { WorkoutType } from "../models/workout-type";
import { Workout } from "../models/workout";
/**
 * See the index.ts file for an explanation of all state properties
 * See the index.ts file for an explanation of all state properties, and model files for explanation of
 * objects that comprise them.  When a new action type is caught in the switch, comment the
 * actions that use this type.
 */

const initialState: IInfoState = {
  exerciseList: [],
  viewWorkout: new Workout(new WorkoutType("", 0, "", []), 0),
  workoutHistory: [],
  workoutList: []
};
export const infoReducer = (state: IInfoState = initialState, action: any) => {
  switch (action.type) {
    // case fetchTypes.GET_WORKOUT_HISTORY:
    //   return {
    //     ...state,
    //     workoutHistory: action.payload.workoutHistory
    //   };
    default:
      return state;
  }
};
