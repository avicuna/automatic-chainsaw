import { Workout } from "../models/workout";
import { Exercise } from "../models/exercise";
import { WorkoutSnapshot } from "../models/workout-snapshot";
import { WorkoutType } from "../models/workout-type";
import { ExerciseType } from "../models/exercise-type";
import { infoReducer } from "./infoReducer";
import { userReducer } from "./userReducer";
import { workoutReducer } from "./workoutReducer";
import { combineReducers } from "redux";
import { miscReducer } from "./miscReducer";
/**
 *  Each interface/reducer tracks a descrete aspect of the application
 *    User: user information, including login info, and basic bio info.
 *    Workout: info about the latest workout that is being logged in app by the user.
 *    info: info outside of immediate user input. The history of workouts, possible workout schemes and possible exercises
 */

/* Basic information about the user that one would excpect. I think we'll store gender as "m" and "f" */
export interface IUserState {
  accountNumber: number;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  height: number;
  weight: number;
  gender: string;
}

/* currWorkout is the workout that the user is currently building for submission. CurrExercise is the current 
exercsie he/she is inputing into said workout object. */
export interface IWorkoutState {
  currWorkout: Workout;
  currExercise: Exercise;
}

/**
 *  workoutHistory contains info to generate a table of user generated workouts
 * viewWorkout is a specific entry from the workout history that is being examined
 * workoutList isa list of all possible workout schemes that a user can choose from.
 * Similarly, exerciseList is a list of all possible exercises.
 */
export interface IInfoState {
  viewWorkoutId: number;
  workoutHistory: WorkoutSnapshot[];
  viewWorkout: Workout;
  workoutList: WorkoutType[];
  exerciseList: ExerciseType[];
}

/*random/misc things needed in state */
export interface IMiscState {
  workoutTypeText: string;
  exerciseTypeText: string;
  errorMessage: string;
  passwordCheck: string;
  workoutHistoryCalled: boolean;
  loginSuccess: boolean;
  historyPage: number;
}

/*Standard redux code to combine reducers into a state */
export interface IState {
  user: IUserState;
  workout: IWorkoutState;
  info: IInfoState;
  misc: IMiscState;
}

export const state = combineReducers<IState>({
  info: infoReducer,
  misc: miscReducer,
  user: userReducer,
  workout: workoutReducer
});
