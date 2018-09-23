import * as React from "react";
import { connect } from "react-redux";
import { IState } from "../../reducers";
import { IUserInfo } from "../../actions/register-user/register-user.actions";
import { RouteComponentProps } from "react-router";
import NavComponent from "../navs/nav.component";
import { Fa } from "mdbreact";

interface IProps extends RouteComponentProps<{}> {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  height: number;
  weight: number;
  gender: string;
  updateUserRegister: (info: IUserInfo) => any;
}

export class Profile extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
    this.edit = this.edit.bind(this);
  }

  public edit(e: any) {
    e.preventDefault();
    this.props.history.push("/edit-profile");
  }

  public render() {
    // const pass = "*".repeat(this.props.password.length);
    return (
      <div>
        <NavComponent />
        <br />
        <br />
        <br />
        <p className="h2-responsive text-center">
          {this.props.firstName + " " + this.props.lastName}
        </p>
        <div id="profile">
          <p className="h3-responsive">
            Account details <Fa icon="pencil" onClick={this.edit} fixed />
          </p>
          <p>First Name: {this.props.firstName}</p>
          <p>Last Name: {this.props.lastName}</p>
          <p>Username: {this.props.username}</p>
          <p>Email: {this.props.email}</p>
        </div>
        <div id="profile">
          <p className="h3-responsive">User Information</p>
          <p>
            Height: {this.props.height}
            (in)
          </p>
          <p>
            Weight: {this.props.weight}
            (lbs)
          </p>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: IState) => {
  return {
    email: state.user.email,
    firstName: state.user.firstName,
    gender: state.user.gender,
    height: state.user.height,
    lastName: state.user.lastName,
    password: state.user.password,
    username: state.user.username,
    weight: state.user.weight
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
