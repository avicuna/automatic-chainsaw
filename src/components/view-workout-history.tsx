import * as React from "react";
import { connect } from "react-redux";
import { IState } from "../reducers";
import { getWorkoutHistory, getWorkoutList } from "../actions/info/info.actions";
import { WorkoutSnapshot } from "../models/workout-snapshot";
import { Workout } from "../models/workout";
import { WorkoutType } from "../models/workout-type";
import { ExerciseType } from "../models/exercise-type";
import ViewWorkout from "./view-workout";
import { getUserExerciseList, getExerciseList } from "../actions/info/info.actions";

interface IProps extends IState {
  viewWorkoutId: number;
  userId: number;
  workoutHistory: WorkoutSnapshot[];
  viewWorkout: Workout;
  workoutList: WorkoutType[];
  exerciseList: ExerciseType[];
  historyPage: number;
  getWorkoutHistory: (userId: number, list: WorkoutType[]) => any;
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
    if (this.props.workoutList[1] !== undefined) {
      this.props.getWorkoutHistory(this.props.userId, this.props.workoutList);
    }
  }
  public render() {
    const workoutEntries: any[] = [];
    for (
      let dispNum = this.props.historyPage * 10;
      dispNum < this.props.historyPage * 10 + 10;
      dispNum++
    ) {
      if (this.props.workoutHistory[dispNum] !== undefined) {
        if (
          this.props.workoutHistory[dispNum].id === this.props.viewWorkoutId
        ) {
          workoutEntries.push(<ViewWorkout />);
        } else {
          workoutEntries.push(
            <tr
              id={this.props.workoutHistory[dispNum].id.toString()}
              key={this.props.workoutHistory[dispNum].id.toString()}
              onClick={this.chooseRow}
            >
              <td id={this.props.workoutHistory[dispNum].id.toString()}>
                {this.props.workoutHistory[dispNum].order}
              </td>
              <td id={this.props.workoutHistory[dispNum].id.toString()}>
                {" "}
                {this.props.workoutHistory[dispNum].date}
              </td>
              <td id={this.props.workoutHistory[dispNum].id.toString()}>
                {" "}
                {this.props.workoutHistory[dispNum].type.name}
              </td>
            </tr>
          );
        }
      }
    }
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
        {/* <span><button onClick = {this.push>></button></span> */}
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
  getExerciseList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewWorkoutHistory);
