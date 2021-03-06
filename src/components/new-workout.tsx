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
import NavComponent from "./navs/nav.component";
import { Table, TableBody, TableHead } from 'mdbreact';
import {RouteComponentProps} from "react-router";

interface IProps extends RouteComponentProps<{}> {
  exerciseList: ExerciseType[];
  exerciseTypeText: string;
  workoutTypeText: string;
  workout: Workout;
  currExercise: Exercise;
  workoutList: WorkoutType[];
  errorMessage: string;
  userId: number;
  getWorkoutList: () => any;
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
    this.props.updateErrorMessage("");
  }

  public enterExercise(e: any) {
    e.preventDefault();
    if (
      this.props.currExercise.rep !== 0 &&
      this.props.currExercise.set !== 0 &&
      this.props.currExercise.name !== ""
    ) {
      this.props.enterExercise(this.props.currExercise, this.props.workout);
      this.props.updateErrorMessage("");
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

  public changeWorkoutType(e: any) {
    const newType =
      this.props.workoutList.find((type: WorkoutType) => {
        return +e.target.id === type.id;
      }) || this.props.workoutList[0];

    this.props.updateWorkoutType(this.props.workout, newType);
    this.props.updateWorkText(newType.name || "No Type");
  }

  public changeExerciseType(e: any) {
    const newTypeVal =
      this.props.exerciseList.find((type: ExerciseType) => {
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
        newType.id,
        newType.description,
        this.props.currExercise.weight,
        this.props.currExercise.set,
        this.props.currExercise.rep
      )
    );

    this.props.updateExerText(newType.name || "No Type");
  }

  /**
   * This can be refactored. Push more to
   * @param e
   */
  public changeExercise(e: any) {
    e.preventDefault();
    switch (e.target.id) {
      case "weight":
        const {
          name,
          id,
          description,
          weight,
          set,
          rep
        } = this.props.currExercise;
        const exercise1 = new Exercise(name, id, description, weight, set, rep);
        exercise1.weight = +e.target.value;
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
  public componentDidMount() {
    if (this.props.workoutList[0] === undefined) {
      this.props.getWorkoutList();
      this.props.getExerciseList();
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
            if (
              this.props.exerciseTypeText.toLocaleLowerCase() ===
              workType.name.toLocaleLowerCase() &&
              this.props.workout.type !== workType
            ) {
              this.changeWorkoutType({ target: { id: workType.id } });
            }
            return (
              <a
                className="dropdown-item"
                key={workType.id}
                onClick={this.changeWorkoutType}
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
            if (
              this.props.exerciseTypeText.toLocaleLowerCase() ===
              exerType.name.toLocaleLowerCase() &&
              this.props.currExercise.name !== exerType.name
            ) {
              this.changeExerciseType({ target: { id: exerType.id } });
            }
            return (
              <a
                className="dropdown-item"
                key={exerType.id}
                onFocus={this.changeExerciseType}
                href="#"
                id={exerType.id.toString()}
              >
                <p
                  key={exerType.id}
                  onFocus={this.changeExerciseType}
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
            <th>
              <button
                id={keyVal.toString()}
                type="button"
                className="btn btn-danger btn-sm"
                aria-label="Close"
                onClick={this.removeExercise}
              >
                Remove
              </button>
            </th>

          </tr>
        );
        keyVal++;
      }
    );

    return (
      <div>
        <NavComponent history={this.props.history}/>
        <h1 className="text-center create-workout-title">Create Workout</h1>
        <div className="dropdown text-center">
          <span>Choose Workout: </span>
          <button
            className="btn btn-sm btn-primary dropdown-toggle"
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

        <form className="form-inline">
          <label>Choose Exercise: </label>
          <div
            className="dropdown form-group mb-2"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <input
              className="form-control"
              type="text"
              value={this.props.exerciseTypeText}
              onChange={this.changeExerText}
            />

            <div
              className="dropdown-menu"
              aria-labelledby="dropdownMenuButton"
            >
              {exerList}
            </div>
          </div>
          <div className="form-group mb-2">
            <label>Weight: </label>
            <input
              type="number"
              className="form-control"
              aria-label="With textarea"
              id="weight"
              value={this.props.currExercise.weight || ""}
              onChange={this.changeExercise}
            />
          </div>
          <div className="form-group mb-2">
            <label>Reps: </label>
            <input
              type="number"
              className="form-control"
              aria-label="With textarea"
              id="rep"
              value={this.props.currExercise.rep || ""}
              onChange={this.changeExercise}
            />
          </div>
          <div className="form-group mb-2">
            <label>Sets: </label>
            <input
              type="number"
              className="form-control"
              aria-label="With textarea"
              id="set"
              value={this.props.currExercise.set || ""}
              onChange={this.changeExercise}
            />
          </div>
          <button className="btn btn-primary btn-sm" onClick={this.enterExercise}>
            Enter Exercise
          </button>
        </form>
        <p>{this.props.errorMessage}</p>

        <div className="create-table-container">
          <Table small hover>
            <TableHead color="primary-color">
              <tr>
                <th scope="col"><h5>Exercise</h5></th>
                <th scope="col"><h5>Weight</h5></th>
                <th scope="col"><h5>Rep</h5></th>
                <th scope="col"><h5>Set</h5></th>
                <th scope="col"></th>
              </tr>
            </TableHead>
            <TableBody>
              {exerciseTable}
            </TableBody>
          </Table>
        </div>
        <div className="submit-center">
          <button className="btn btn-primary" onClick={this.submit}>
            Submit Workout
          </button>
        </div>

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
