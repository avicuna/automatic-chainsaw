import * as React from "react";
import { connect } from "react-redux";
import { IState } from "../reducers";
import {
  getWorkoutHistory,
  getWorkoutList
} from "../actions/info/info.actions";
import { WorkoutSnapshot } from "../models/workout-snapshot";
import { Workout } from "../models/workout";
import { WorkoutType } from "../models/workout-type";
import { ExerciseType } from "../models/exercise-type";
import { HomeNavComponent } from "./navs/home-nav.component";
import ViewWorkout from "./view-workout";
import {
  getUserExerciseList,
  getExerciseList
} from "../actions/info/info.actions";
/**
 * This is a shell component, don't impliment this!
 * Copy and past the text into new components.
 */
interface IProps extends IState {
  viewWorkoutId: number;
  userId: number;
  workoutHistory: WorkoutSnapshot[];
  viewWorkout: Workout;
  workoutList: WorkoutType[];
  exerciseList: ExerciseType[];
  getWorkoutList: (userId: number) => any;
  getUserExerciseList: (
    id: number,
    list: ExerciseType[],
    viewWorkout: Workout
  ) => any;
  getExerciseList: () => any;
}

class ViewWorkoutHistory extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
    this.chooseRow = this.chooseRow.bind(this);
  }
  public chooseRow(e: any) {
    const snapshot =
      this.props.workoutHistory.find((snap: WorkoutSnapshot) => {
        return snap.id === +e.target.id;
      }) || this.props.workoutHistory[0];
    this.props.getUserExerciseList(
      snapshot.id,
      this.props.exerciseList,
      new Workout(snapshot.type, snapshot.order, [], snapshot.date)
    );
  }

  public componentDidMount() {
    if (this.props.exerciseList[1] === undefined) {
      this.props.getExerciseList();
    }
    if (this.props.workoutList[1] === undefined) {
      this.props.getWorkoutList(this.props.userId);
    }
  }
  public render() {
    const workoutEntries = this.props.workoutHistory.map(
      (workout: WorkoutSnapshot) => {
        if (workout.id === this.props.viewWorkoutId) {
          return <ViewWorkout />;
        }
        return (
          <tr
            id={workout.id.toString()}
            key={workout.id.toString()}
            onClick={this.chooseRow}
          >
            <td id={workout.id.toString()}>{workout.order}</td>
            <td id={workout.id.toString()}> {workout.date}</td>
            <td id={workout.id.toString()}> {workout.type.name}</td>
          </tr>
        );
      }
    );
    return (
      <div>
        <HomeNavComponent />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Order</th>
              <th scope="col">Date</th>
              <th scope="col">Type</th>
            </tr>
          </thead>
          <tbody>{workoutEntries}</tbody>
        </table>
        <ViewWorkout />
      </div>
    );
  }
}
const mapStateToProps = (state: IState) => {
  return {
    viewWorkoutId: state.info.viewWorkoutId,
    userId: state.user.accountNumber,
    workoutList: state.info.workoutList,
    workoutHistory: state.info.workoutHistory,
    exerciseList: state.info.exerciseList
  };
};

const mapDispatchToProps = {
  getWorkoutList,
  getWorkoutHistory,
  getUserExerciseList,
  getExerciseList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewWorkoutHistory);
