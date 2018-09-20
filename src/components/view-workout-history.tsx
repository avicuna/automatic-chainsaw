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

/**
 * This is a shell component, don't impliment this!
 * Copy and past the text into new components.
 */
interface IProps extends IState {
  userId: number;
  workoutHistory: WorkoutSnapshot[];
  viewWorkout: Workout;
  workoutList: WorkoutType[];
  exerciseList: ExerciseType[];
  getWorkoutList: (userId: number) => any;
}

class ViewWorkoutHistory extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    if (this.props.workoutList[1] === undefined) {
      this.props.getWorkoutList(this.props.userId);
    }
  }
  public render() {
    const workoutEntries = this.props.workoutHistory.map(workout => {
      return (
        <div id="date-type" key={workout.id}>
          <p id="order">Workout Number : {workout.order}</p>
          <p>Date : {workout.date}</p>
          <p>Type : {workout.type}</p>
        </div>
      );
    });
    return (
      <div>
        <HomeNavComponent />
        {window.console.log(this.props.workoutHistory)}
        {workoutEntries}
      </div>
    );
  }
}
const mapStateToProps = (state: IState) => {
  return {
    userId: state.user.accountNumber,
    workoutList: state.info.workoutList,
    workoutHistory: state.info.workoutHistory
  };
};

const mapDispatchToProps = {
  getWorkoutList,
  getWorkoutHistory
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewWorkoutHistory);
