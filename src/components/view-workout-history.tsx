import * as React from "react";
import { connect } from "react-redux";
import { IState } from "../reducers";
import {
  getWorkoutHistory,
  getWorkoutList,
  zeroViewWorkout
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
import NavComponent from "./navs/nav.component";

interface IProps extends IState {
  viewWorkoutId: number;
  userId: number;
  workoutHistory: WorkoutSnapshot[];
  viewWorkout: Workout;
  workoutList: WorkoutType[];
  exerciseList: ExerciseType[];
  historyPage: number;
/**
 * @component
 * A table which shows all of the user's previous workouts, and displays one's details when clicked on
 */
  getWorkoutHistory: (userId: number, list: WorkoutType[]) => any;
  zeroViewWorkout: () => any;
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
    this.props.zeroViewWorkout();
    // this.changeHistoryPage({ target: { id: "fst" } });
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
        <NavComponent />
        <br />
        <br />
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
  changeHistoryPage,
  zeroViewWorkout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewWorkoutHistory);
