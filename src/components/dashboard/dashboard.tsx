import * as React from "react";
import { connect } from "react-redux";
import { IState } from "../../reducers";
import { getExerciseList } from "../../actions/info/info.actions";
import { HomeNavComponent } from "../navs/home-nav.component";
import ViewWorkout from "../view-workout";
import NewWorkout from "../new-workout";

/**
 * This is a shell component, don't impliment this!
 * Copy and past the text into new components.
 */
interface IProps {
  exampleProp: string;
  getExerciseList: () => any;
}

class Dashboard extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
    // remember to bind your functions here
  }
  public componentDidMount() {
    this.props.getExerciseList();
  }
  public render() {
    return (
      <div>
        <HomeNavComponent />
        <ViewWorkout />
        <NewWorkout />
      </div>
    );
  }
}
const mapStateToProps = (state: IState) => {
  return {
    // insert properties of the state here
  };
};

const mapDispatchToProps = {
  getExerciseList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
