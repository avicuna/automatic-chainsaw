import * as React from "react";
import { connect } from "react-redux";
import { IState } from "../../reducers";
import {
  getExerciseList,
  getWorkoutList,
  getWorkoutHistory
} from "../../actions/info/info.actions";
import { HomeNavComponent } from "../navs/home-nav.component";
import ViewWorkout from "../view-workout";
import { WorkoutSnapshot } from "../../models/workout-snapshot";
import { WorkoutType } from "../../models/workout-type";
import { ExerciseType } from "../../models/exercise-type";
import ViewWorkoutHistory from "../view-workout-history";
// import NewWorkout from "../new-workout";

/**
 * This is a shell component, don't impliment this!
 * Copy and past the text into new components.
 */
interface IProps {
  userId: number;
  exampleProp: string;
  workoutHistoryCalled: boolean;
  workoutList: WorkoutType[];
  workoutHistory: WorkoutSnapshot[];
  exerciseList: ExerciseType[];
  getExerciseList: () => any;
  getWorkoutList: (userId: number) => any;
  getWorkoutHistory: (userId: number, workoutList: WorkoutType[]) => any;
}

class Dashboard extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
    // remember to bind your functions here
    this.getWork = this.getWork.bind(this);
  }
  public getWork(e: any) {
    this.props.getWorkoutHistory(this.props.userId, this.props.workoutList);
  }
  public componentDidMount() {
    if (this.props.exerciseList[1] === undefined) {
      window.console.log("getting the exercises");
      this.props.getExerciseList();
      this.props.getWorkoutList(this.props.userId);
    }
  }
  public render() {
    window.console.log("exercise list");
    window.console.log(this.props.exerciseList);
    window.console.log(this.props.workoutHistoryCalled);
    if (
      this.props.workoutHistoryCalled === false &&
      this.props.workoutList[1] !== undefined
    ) {
      this.props.getWorkoutHistory(this.props.userId, this.props.workoutList);
    }
    return (
      <div>
        <HomeNavComponent />
        <ViewWorkout />
      </div>
    );
  }
}
const mapStateToProps = (state: IState) => {
  return {
    userId: state.user.accountNumber,
    workoutHistoryCalled: state.misc.workoutHistoryCalled,
    workoutList: state.info.workoutList,
    exerciseList: state.info.exerciseList
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
