import * as React from "react";
import { connect } from "react-redux";
import { IState } from "../../reducers";
import { getExerciseList,getViewWorkout, getWorkoutHistory,getWorkoutList } from "../../actions/info/info.actions";
import {clearSuccess} from "../../actions/misc/misc.actions";
import { getExerciseList } from "../../actions/info/info.actions";
import { HomeNavComponent } from "../navs/home-nav.component";
import ViewWorkout from "../view-workout";
// import NewWorkout from "../new-workout";
import { ExerciseType } from "../../models/exercise-type";
import { WorkoutSnapshot } from "../../models/workout-snapshot";
import { WorkoutType } from "../../models/workout-type";


/**
 * This is a shell component, don't impliment this!
 * Copy and past the text into new components.
 */
interface IProps {
  userId: number;
  workoutHistory: WorkoutSnapshot[];
  workoutList: WorkoutType[];
  exerciseList: ExerciseType[];
  getViewWorkout: (id:number,exerciseList: ExerciseType[],snapshot: WorkoutSnapshot) => any;
  getExerciseList: () => any;
  getWorkoutList: ()=> any;
  getWorkoutHistory: (id:number,workoutList: WorkoutType[]) => any;
  clearSuccess: () => any;
}

class Dashboard extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
    // remember to bind your functions here
  }
  public componentDidMount() {
    this.props.getExerciseList();
    this.props.getWorkoutList();
    this.props.clearSuccess();
  }
  public render() {
    if(this.props.exerciseList[1] !==undefined &&this.props.workoutHistory[1] === undefined){
      window.console.log("getting workoutHistory")
      this.props.getWorkoutHistory(this.props.userId,this.props.workoutList);
 
      const lastSnap:WorkoutSnapshot = 
      this.props.workoutHistory.find((snap:WorkoutSnapshot) =>{
          return (snap.order === this.props.workoutHistory.length);
      })|| {id: 0,order: 0,type: new WorkoutType("",0,"",[]),date:""}
      this.props.getViewWorkout(lastSnap.id,this.props.exerciseList,lastSnap)
    }
    return (
      <div>
        <HomeNavComponent />
        <ViewWorkout />
        {/* <NewWorkout /> */}
      </div>
    );
  }
}
const mapStateToProps = (state: IState) => {
  return {
    exerciseList: state.info.exerciseList,
    workoutList: state.info.workoutList,
    workoutHistory: state.info.workoutHistory,
    userId: state.user.accountNumber
  };
};

const mapDispatchToProps = {
  getExerciseList,
  getViewWorkout ,
  getWorkoutHistory,
  getWorkoutList,
    clearSuccess
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
