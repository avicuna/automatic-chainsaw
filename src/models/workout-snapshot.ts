import { WorkoutType } from "./workout-type";

/**
 * This object contains the neccesary info to populate the workoutHistory table.
 * it's small in scope and corresponds to the user-workout table in the api.
 */
export class WorkoutSnapshot {
  public order: number;
  public type: WorkoutType;
  public date: string;
  public id: number;
}
