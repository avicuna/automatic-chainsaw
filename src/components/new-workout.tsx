import * as React from "react";
import { connect } from "react-redux";
import { Workout } from "../models/workout";
import { IState } from "../reducers";
import { Exercise } from "../models/exercise";
import {
  updateWorkoutType,
  changeCurrExercise,
  enterExercise,
  submitWorkout,
  removeExercise
} from "../actions/workout/workout.actions";
import { WorkoutType } from "../models/workout-type";
import {
  updateWorkText,
  updateExerText,
  updateErrorMessage
} from "../actions/misc/misc.actions";
import { getWorkoutList, getExerciseList } from "../actions/info/info.actions";
import { ExerciseType } from "../models/exercise-type";
interface IProps {
  exerciseList: ExerciseType[];
  exerciseTypeText: string;
  workoutTypeText: string;
  workout: Workout;
  currExercise: Exercise;
  workoutList: WorkoutType[];
  errorMessgae: string;
  userId: number;
  enterExercise: (exercise: Exercise, workout: Workout) => any;
  changeCurrExercise: (exercise: Exercise) => any;
  removeExercise: (workout: Workout, index: number) => any;
  getExerciseList: () => any;
  updateErrorMessage: (message: string) => any;
  updateWorkText: (text: string) => any;
  updateExerText: (text: string) => any;
  updateWorkoutType: (workout: Workout, workoutType: WorkoutType) => any;
  submitWorkout: (userId: number, workout: Workout) => any;
}

class NewWorkout extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);

    this.changeWorkText = this.changeWorkText.bind(this);
    this.changeExerText = this.changeExerText.bind(this);
    this.changeExercise = this.changeExercise.bind(this);
    this.enterExercise = this.enterExercise.bind(this);
    this.submit = this.submit.bind(this);
    this.changeExerciseType = this.changeExerciseType.bind(this);
    this.changeWorkoutType = this.changeWorkoutType.bind(this);
    this.removeExercise = this.removeExercise.bind(this);
  }
  public removeExercise(e: any) {
    this.props.removeExercise(this.props.workout, +e.target.id);
  }
  public submit(e: any) {
    e.preventDefault();
    this.props.submitWorkout(this.props.userId, this.props.workout);
  }

  public enterExercise(e: any) {
    e.preventDefault();
    if (
      this.props.currExercise.weight !== 0 &&
      this.props.currExercise.rep !== 0 &&
      this.props.currExercise.set !== 0
    ) {
      this.props.enterExercise(this.props.currExercise, this.props.workout);
    } else {
      this.props.updateErrorMessage(
        "Make sure you selected an exercise type and filled in weight, set, and reps."
      );
    }
  }
  public changeWorkText(e: any) {
    e.preventDefault();

    this.props.updateWorkText(e.target.value);
  }
  public changeExerText(e: any) {
    e.preventDefault();
    this.props.updateExerText(e.target.value);
  }
  public componentDidMount() {
    if (this.props.workoutList[0] === undefined) {
      this.props.getExerciseList();
    }
  }

  public changeWorkoutType(e: any) {
    const newType =
      this.props.workoutList.find((type: WorkoutType) => {
        window.console.log(e.target.id);
        window.console.log(type.id);
        return +e.target.id === type.id;
      }) || this.props.workoutList[0];

    this.props.updateWorkoutType(this.props.workout, newType);
    this.props.updateWorkText(newType.name || "No Type");
  }

  public changeExerciseType(e: any) {
    const newTypeVal =
      this.props.exerciseList.find((type: ExerciseType) => {
        window.console.log(e.target.id);
        window.console.log(type.id);
        return +e.target.id === type.id;
      }) || this.props.exerciseList[0];

    const newType = new ExerciseType(
      newTypeVal.name,
      newTypeVal.id,
      newTypeVal.description
    );
    this.props.changeCurrExercise(
      new Exercise(
        newType.name,
        0,
        newType.description,
        this.props.currExercise.weight,
        this.props.currExercise.set,
        this.props.currExercise.rep
      )
    );
    this.props.updateExerText(newType.name || "No Type");
  }
  public changeExercise(e: any) {
    e.preventDefault();
    switch (e.target.id) {
      case "weight":
        const exercise1 = new Exercise(
          this.props.currExercise.name,
          this.props.currExercise.id,
          this.props.currExercise.description,
          this.props.currExercise.weight,
          this.props.currExercise.set,
          this.props.currExercise.rep
        );
        exercise1.weight = +e.target.value;
        window.console.log(exercise1.weight);
        this.props.changeCurrExercise(exercise1);
        break;
      case "rep":
        const exercise2 = new Exercise(
          this.props.currExercise.name,
          this.props.currExercise.id,
          this.props.currExercise.description,
          this.props.currExercise.weight,
          this.props.currExercise.set,
          this.props.currExercise.rep
        );
        exercise2.rep = +e.target.value;
        this.props.changeCurrExercise(exercise2);
        break;
      case "set":
        const exercise3 = new Exercise(
          this.props.currExercise.name,
          this.props.currExercise.id,
          this.props.currExercise.description,
          this.props.currExercise.weight,
          this.props.currExercise.set,
          this.props.currExercise.rep
        );
        exercise3.set = +e.target.value;
        this.props.changeCurrExercise(exercise3);
        break;
      default:
        this.props.changeCurrExercise(
          new Exercise("asdf", 4321, "asdsad", 123, 123, 123)
        );
    }
  }
  public render() {
    const workList = (
      <div>
        {this.props.workoutList.map(workType => {
          if (
            workType.name
              .slice(0, this.props.workoutTypeText.length)
              .toLocaleLowerCase() ===
            this.props.workoutTypeText.toLocaleLowerCase()
          ) {
            return (
              <a
                className="dropdown-item"
                key={workType.id}
                href="#"
                id={workType.id.toString()}
              >
                <p
                  key={workType.id}
                  onClick={this.changeWorkoutType}
                  id={workType.id.toString()}
                >
                  {workType.name}
                </p>
              </a>
            );
          }
          return;
        })}
      </div>
    );

    const exerList = (
      <div>
        {this.props.exerciseList.map((exerType: ExerciseType) => {
          if (
            exerType.name
              .slice(0, this.props.exerciseTypeText.length)
              .toLowerCase() === this.props.exerciseTypeText.toLowerCase()
          ) {
            return (
              <a
                className="dropdown-item"
                key={exerType.id}
                href="#"
                id={exerType.id.toString()}
              >
                <p
                  key={exerType.id}
                  onClick={this.changeExerciseType}
                  id={exerType.id.toString()}
                >
                  {exerType.name}
                </p>
              </a>
            );
          }
          return;
        })}
      </div>
    );
    let keyVal = 0;
    const exerciseTable = this.props.workout.exercises.map(
      (exercise: Exercise) => {
        return (
          <tr key={keyVal}>
            <th scope="row">{exercise.name}</th>
            <th>{exercise.weight}</th>
            <th>{exercise.rep}</th>
            <th>{exercise.set}</th>
            <button
              id={keyVal.toString()}
              type="button"
              className="close"
              aria-label="Close"
              onClick={this.removeExercise}
            >
              <span id={keyVal.toString()} aria-hidden="true">
                &times;
              </span>
            </button>
          </tr>
        );
        keyVal++;
      }
    );

    return (
      <div>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <input
              type="text"
              value={this.props.workoutTypeText}
              onChange={this.changeWorkText}
            />
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {workList}
          </div>
        </div>
        <p>{this.props.errorMessgae}</p>

        <button className="btn btn-primary" onClick={this.submit}>
          submit Workout
        </button>
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">exercise</th>
              <th scope="col">weight</th>
              <th scope="col">rep</th>
              <th scope="col">set</th>
            </tr>
          </thead>
          <tbody>
            {exerciseTable}
            <tr>
              <th scope="row">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <input
                      type="text"
                      value={this.props.exerciseTypeText}
                      onChange={this.changeExerText}
                    />
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    {exerList}
                  </div>
                </div>
              </th>
              <th>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Weight</span>
                  </div>
                  <input
                    type="number"
                    className="form-control"
                    aria-label="With textarea"
                    id="weight"
                    value={this.props.currExercise.weight}
                    onChange={this.changeExercise}
                  />
                </div>
              </th>
              <th>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Reps</span>
                  </div>
                  <input
                    type="number"
                    className="form-control"
                    aria-label="With textarea"
                    id="rep"
                    value={this.props.currExercise.rep}
                    onChange={this.changeExercise}
                  />
                </div>
              </th>
              <th>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Sets</span>
                  </div>
                  <input
                    type="number"
                    className="form-control"
                    aria-label="With textarea"
                    id="set"
                    value={this.props.currExercise.set}
                    onChange={this.changeExercise}
                  />
                </div>
              </th>
              <th>
                <button
                  className="btn btn-primary"
                  onClick={this.enterExercise}
                >
                  Enter Exercise
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state: IState) => {
  return {
    currExercise: state.workout.currExercise,
    errorMessgae: state.misc.errorMessage,
    exerciseList: state.info.exerciseList,
    exerciseTypeText: state.misc.exerciseTypeText,
    userId: state.user.accountNumber,
    workout: state.workout.currWorkout,
    workoutList: state.info.workoutList,
    workoutTypeText: state.misc.workoutTypeText
  };
};

const mapDispatchToProps = {
  changeCurrExercise,
  enterExercise,
  getExerciseList,
  getWorkoutList,
  submitWorkout,
  updateErrorMessage,
  updateExerText,
  updateWorkText,
  updateWorkoutType,
  removeExercise
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewWorkout);
