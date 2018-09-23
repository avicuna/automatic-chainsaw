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
import ViewWorkout from "./view-workout";
import { changeHistoryPage } from "../actions/misc/misc.actions";
import {
  getUserExerciseList,
  getExerciseList
} from "../actions/info/info.actions";

interface IProps extends IState {
  viewWorkoutId: number;
  userId: number;
  workoutHistory: WorkoutSnapshot[];
  viewWorkout: Workout;
  workoutList: WorkoutType[];
  exerciseList: ExerciseType[];
  historyPage: number;
  getWorkoutList: (userId: number) => any;
  getUserExerciseList: (
    id: number,
    list: ExerciseType[],
    viewWorkout: Workout
  ) => any;
  getExerciseList: () => any;
  changeHistoryPage: (
    page: number,
    type: string,
    history: WorkoutSnapshot[]
  ) => any;
}

class ViewWorkoutHistory extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
    this.chooseRow = this.chooseRow.bind(this);
    this.changeHistoryPage = this.changeHistoryPage.bind(this);
  }
  public changeHistoryPage(e: any) {
    e.preventDefault();
    this.props.changeHistoryPage(
      this.props.historyPage,
      e.target.id,
      this.props.workoutHistory
    );
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
        <span>
          <button id="fst" onClick={this.changeHistoryPage}>{`<<`}</button>
          <button id="bwd" onClick={this.changeHistoryPage}>{`<`}</button>
          <button id="fwd" onClick={this.changeHistoryPage}>{`>`}</button>
          <button id="lst" onClick={this.changeHistoryPage}>{`>>`}</button>
        </span>
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
    exerciseList: state.info.exerciseList,
    historyPage: state.misc.historyPage
  };
};

const mapDispatchToProps = {
  getWorkoutList,
  getWorkoutHistory,
  getUserExerciseList,
  getExerciseList,
  changeHistoryPage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewWorkoutHistory);
