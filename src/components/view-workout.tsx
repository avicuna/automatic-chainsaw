import * as React from "react";
import { connect } from "react-redux";
import { IState } from "../reducers";
import { WorkoutType } from "../models/workout-type";
import { Exercise } from "../models/exercise";
import { getUserExerciseList } from "../actions/info/info.actions";
import { Workout } from "../models/workout";
import { ExerciseType } from "../models/exercise-type";
interface IProps {
  date: string;
  exercises: Exercise[];
  exerciseList: ExerciseType[];
  order: number;
  type: WorkoutType;
  viewWorkoutId: number;
  viewWorkout: Workout;
  getUserExerciseList: (
    viewWorkoutId: number,
    exerciseList: ExerciseType[],
    viewWorkout: Workout
  ) => any;
}

class ViewWorkout extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    if (this.props.viewWorkoutId !== 0) {
      this.props.getUserExerciseList(
        this.props.viewWorkoutId,
        this.props.exerciseList,
        this.props.viewWorkout
      );
    }
  }
  public render() {
    const exerciseEntries = this.props.exercises.map(exercise => {
      return (
        <tr key={exercise.id}>
          <td>{exercise.name}</td>
          <td>{exercise.weight}</td>

          <td>{exercise.set}</td>
          <td>{exercise.rep}</td>
        </tr>
      );
    });
    return (
      <div>
        <p>{this.props.viewWorkoutId}</p>
        <div id="date-type">
          <p id="order">Workout Number : {this.props.order}</p>
          <p>Date : {this.props.date}</p>
          <p>Type : {this.props.type.name}</p>
        </div>
        <p id="table-title">Exercise</p>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Weight</th>
              <th scope="col">Set</th>
              <th scope="col">Reps</th>
            </tr>
          </thead>
          <tbody>{exerciseEntries}</tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state: IState) => {
  return {
    exerciseList: state.info.exerciseList,
    viewWorkout: state.info.viewWorkout,
    date: state.info.viewWorkout.date,
    exercises: state.info.viewWorkout.exercises,
    order: state.info.viewWorkout.order,
    type: state.info.viewWorkout.type,
    viewWorkoutId: state.info.viewWorkoutId
  };
};

const mapDispatchToProps = {
  getUserExerciseList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewWorkout);
