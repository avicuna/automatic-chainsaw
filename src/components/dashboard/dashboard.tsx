import * as React from "react";
import { connect } from "react-redux";
import { IState } from "../../reducers";
import {
  getExerciseList,
  getWorkoutList,
  getWorkoutHistory
} from "../../actions/info/info.actions";

import { WorkoutSnapshot } from "../../models/workout-snapshot";
import { WorkoutType } from "../../models/workout-type";
import { ExerciseType } from "../../models/exercise-type";
import { RouteComponentProps } from "../../../node_modules/@types/react-router";
import ViewWorkout from "../view-workout";

interface IProps extends RouteComponentProps<{}> {
  userId: number;
  workoutHistoryCalled: boolean;
  workoutList: WorkoutType[];
  workoutHistory: WorkoutSnapshot[];
  exerciseList: ExerciseType[];
  firstName: string;
  lastName: string;
  getExerciseList: () => any;
  getWorkoutList: () => any;
  getWorkoutHistory: (userId: number, workoutList: WorkoutType[]) => any;
}

export class Dashboard extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    if (this.props.exerciseList[1] === undefined) {
      this.props.getExerciseList();
    }
    if (this.props.workoutList[1] === undefined) {
      this.props.getWorkoutList();
    }
  }
  public render() {
    if (
      this.props.workoutHistoryCalled === false &&
      this.props.workoutList[1] !== undefined
    ) {
      window.console.log("Getting history");
      this.props.getWorkoutHistory(this.props.userId, this.props.workoutList);
      return <div>Loading</div>;
    } else {
      return (
        <div>
          <h4>
            HWelcome back, {this.props.firstName} {this.props.lastName}. Ready
            to SWOLE?
          </h4>
          <ViewWorkout history={this.props.history} />
        </div>
      );
    }
  }
}
const mapStateToProps = (state: IState) => {
  return {
    userId: state.user.accountNumber,
    workoutHistoryCalled: state.misc.workoutHistoryCalled,
    workoutList: state.info.workoutList,
    exerciseList: state.info.exerciseList,
    firstName: state.user.firstName,
    lastName: state.user.lastName
  };
};

const mapDispatchToProps = {
  getExerciseList,
  getWorkoutList,
  getWorkoutHistory
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
