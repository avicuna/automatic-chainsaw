import * as React from "react";
import { connect } from "react-redux";
import { IState } from "../../reducers";
import {
  getExerciseList,
  getWorkoutList,
  getWorkoutHistory
} from "../../actions/info/info.actions";
import NavComponent from "../navs/nav.component";
import { WorkoutSnapshot } from "../../models/workout-snapshot";
import { WorkoutType } from "../../models/workout-type";
import { ExerciseType } from "../../models/exercise-type";
import { RouteComponentProps } from "../../../node_modules/@types/react-router";
import ViewWorkout from "../view-workout";
import { changeWeight, submitWeight } from "../../actions/weight/weight.action";
import { Fa } from "mdbreact";

interface IProps extends RouteComponentProps<{}> {
  userId: number;
  workoutHistoryCalled: boolean;
  workoutList: WorkoutType[];
  workoutHistory: WorkoutSnapshot[];
  exerciseList: ExerciseType[];
  firstName: string;
  lastName: string;
  weight: number;
  submitWeight: (userId: number, weight: number) => any;
  changeWeight: (weight: number) => any;
  getExerciseList: () => any;
  getWorkoutList: () => any;
  getWorkoutHistory: (userId: number, workoutList: WorkoutType[]) => any;
}

export class Dashboard extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
    this.changeWeight = this.changeWeight.bind(this);
    this.submitWeight = this.submitWeight.bind(this);
    this.loading = this.loading.bind(this);
  }
  public changeWeight(e: any) {
    this.props.changeWeight(e.target.value);
  }
  public submitWeight(e: any) {
    this.props.submitWeight(this.props.userId, this.props.weight);
  }
  public loading() {
      return <div id="loading">
          <Fa icon="refresh" spin size="3x" fixed/>
          <span className="sr-only">Loading...</span>
      </div>;
  }
  public componentDidMount() {
      setTimeout(this.loading, 3000);
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
      this.props.getWorkoutHistory(this.props.userId, this.props.workoutList);
      return <div id="loading">
          <Fa icon="refresh" spin size="3x" fixed/>
          <span className="sr-only">Loading...</span>
      </div>;
    } else if (this.props.workoutHistoryCalled === false) {
      return <div id="loading">
            <Fa icon="refresh" spin size="3x" fixed/>
        <span className="sr-only">Loading...</span>
    </div>;
    } else {
      return (
        <div>
          <NavComponent history={this.props.history} />
          <br/>
          <br/>
          <h2>
            Welcome back, {this.props.firstName} {this.props.lastName}
          </h2>
          <br/>
          <span>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">Update Weight</span>
              </div>
              <input
                type="number"
                className="form-control"
                aria-label="With textarea"
                id="weight"
                value={this.props.weight}
                onChange={this.changeWeight}
              />
            </div>
            <br/>
            <button onClick={this.submitWeight}>Save Change</button>
          </span>
          <br/>
          <br/>
          <h3>Most Recent Workout</h3>
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
    lastName: state.user.lastName,
    weight: state.user.weight
  };
};

const mapDispatchToProps = {
  getExerciseList,
  getWorkoutList,
  getWorkoutHistory,
  changeWeight,
  submitWeight
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
