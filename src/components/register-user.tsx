import * as React from "react";
import { connect } from "react-redux";
import { IState } from "../reducers";
import { updateErrorMessage } from "../actions/misc/misc.actions";
import {
  updateUserRegister,
  registerUser,
  IUserInfo
} from "../actions/register-user/register-user.actions";
import "../App.css";
import { Container, Row, Input, Button} from "mdbreact";
import {RouteComponentProps} from "react-router";


interface IProps extends RouteComponentProps<{}>{
  accountNumber: number;
  username: string;
  password: string;
  passwordCheck: string;
  email: string;
  errorMessage: string;
  firstName: string;
  lastName: string;
  height: number;
  weight: number;
  gender: string;
  updateUserRegister: (infro: IUserInfo) => any;
  registerUser: (info: IUserInfo) => any;
  updateErrorMessage: (message: string) => any;
}

export class RegisterUser extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
    this.updateRegister = this.updateRegister.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }
  public registerUser(e: any) {
    if (this.props.password === this.props.passwordCheck) {
      const info: IUserInfo = {
        email: this.props.email,
        firstName: this.props.firstName,
        gender: this.props.gender,
        height: this.props.height,
        lastName: this.props.lastName,
        password: this.props.password,
        passwordCheck: this.props.passwordCheck,
        username: this.props.username,
        weight: this.props.weight
      };
      this.props.registerUser(info);
      this.props.history.push("/dashboard")
    } else {
      this.props.updateErrorMessage(
        "Retyped password didn't match first password."
      );
    }
  }
  public updateRegister(e: any) {
    e.preventDefault();
    const info: IUserInfo = {
      email: this.props.email,
      firstName: this.props.firstName,
      gender: this.props.gender,
      height: this.props.height,
      lastName: this.props.lastName,
      password: this.props.password,
      passwordCheck: this.props.passwordCheck,
      username: this.props.username,
      weight: this.props.weight
    };

    switch (e.target.id) {
      case "EM":
        this.props.updateUserRegister({
          ...info,
          email: e.target.value
        });
        break;
      case "FN":
        this.props.updateUserRegister({
          ...info,
          firstName: e.target.value
        });
        break;
      case "LN":
        this.props.updateUserRegister({
          ...info,
          lastName: e.target.value
        });
        break;
      case "GD":
        this.props.updateUserRegister({
          ...info,
          gender: e.target.value
        });
        break;
      case "UN":
        this.props.updateUserRegister({
          ...info,
          username: e.target.value
        });
        break;
      case "PW":
        this.props.updateUserRegister({
          ...info,
          password: e.target.value
        });
        break;
      case "CPW":
        this.props.updateUserRegister({
          ...info,
          passwordCheck: e.target.value
        });
        break;
      case "HT":
        this.props.updateUserRegister({
          ...info,
          height: e.target.value
        });
        break;
      case "WT":
        this.props.updateUserRegister({
          ...info,
          weight: e.target.value
        });
        break;
      default:
        this.props.updateUserRegister(info);
    }
  }

  public render() {
    return (
      <div>
          <br/>
          <br/>
          <br/>
          <p className="h3-responsive text-center">Register</p>
          <Container id="sign-up-container">
              <Row>
                  <form>
                      <div className="row">
                          <div className="col-md-12">
                              <Input
                                  id="UN"
                                  type="text"
                                  className="form-control"
                                  label="Username"
                                  value={this.props.username}
                                  onChange={this.updateRegister}/>
                          </div>
                      </div>
                      <div className="row">
                          <div className="col-md-6">
                              <Input
                                  id="PW"
                                  type="password"
                                  className="form-control"
                                  label="Password"
                                  value={this.props.password}
                                  onChange={this.updateRegister}/>
                          </div>

                          <div className="col-md-6">
                              <Input
                                  id="CPW"
                                  type="password"
                                  className="form-control"
                                  label="Re-type Password"
                                  value={this.props.passwordCheck}
                                  onChange={this.updateRegister}/>
                          </div>
                      </div>

                      <div className="row">
                          <div className="col-md-12">
                              <Input
                                  id="EM"
                                  type="text"
                                  className="form-control"
                                  label="Email"
                                  value={this.props.email}
                                  onChange={this.updateRegister}/>
                          </div>
                      </div>

                      <div className="row">
                          <div className="col-md-6">
                              <Input
                                  id="FN"
                                  type="text"
                                  className="form-control"
                                  label="First Name"
                                  value={this.props.firstName}
                                  onChange={this.updateRegister} />
                          </div>
                          <div className="col-md-6">
                              <Input
                                  id="LN"
                                  type="text"
                                  className="form-control"
                                  label="Last Name"
                                  value={this.props.lastName}
                                  onChange={this.updateRegister} />
                          </div>
                      </div>

                      <div className="row">
                          <div className="col-md-6">
                              <Input
                                  id="HT"
                                  type="number"
                                  className="form-control"
                                  label="Height (in)"
                                  value={this.props.height}
                                  onChange={this.updateRegister} />
                          </div>
                          <div className="col-md-6">
                              <Input
                                  id="WT"
                                  type="number"
                                  className="form-control"
                                  label="Weight (lbs)"
                                  value={this.props.weight}
                                  onChange={this.updateRegister}/>
                          </div>
                      </div>

                      <div className="row">
                          <div className="col-md-12">
                              <Input
                                  id="GD"
                                  type="text"
                                  className="form-control"
                                  label="Gender"
                                  value={this.props.gender}
                                  onChange={this.updateRegister}/>
                          </div>
                      </div>
                      <div className="text-center">
                          <Button className="btn btn-primary" onClick={this.registerUser}>
                              Register
                          </Button>
                      </div>
                  </form>
              </Row>
          </Container>

        <div className="form-group">
          <label>Username</label>
          <br />
          <input
            id="UN"
            type="text"
            className="form-control"
            placeholder="Enter username"
            value={this.props.username}
            onChange={this.updateRegister}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <br />
          <input
            id="PW"
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={this.props.password}
            onChange={this.updateRegister}
          />
        </div>
        <div className="form-group">
          <label>Re-type Password</label>
          <br />
          <input
            id="CPW"
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={this.props.passwordCheck}
            onChange={this.updateRegister}
          />
        </div>

        <div className="form-group">
          <label>email</label>
          <br />
          <input
            id="EM"
            type="text"
            className="form-control"
            placeholder="eneter email"
            value={this.props.email}
            onChange={this.updateRegister}
          />
        </div>
        <div className="form-group">
          <label>first name</label>
          <br />
          <input
            id="FN"
            type="text"
            className="form-control"
            placeholder="Enter first name"
            value={this.props.firstName}
            onChange={this.updateRegister}
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <br />
          <input
            id="LN"
            type="text"
            className="form-control"
            placeholder="Enter last name"
            value={this.props.lastName}
            onChange={this.updateRegister}
          />
        </div>
        <div className="form-group">
          <label>height </label>
          <br />
          <input
            id="HT"
            type="number"
            className="form-control"
            placeholder="Enter height (in)"
            value={this.props.height}
            onChange={this.updateRegister}
          />
        </div>
        <div className="form-group">
          <label>weight </label>
          <br />
          <input
            id="WT"
            type="number"
            className="form-control"
            placeholder="Enter weight (lbs)"
            value={this.props.weight}
            onChange={this.updateRegister}
          />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <br />
          <input
            id="GD"
            type="string"
            className="form-control"
            placeholder="Enter Gender"
            value={this.props.gender}
            onChange={this.updateRegister}
          />
        </div>
        <br />
        <button className="btn btn-primary" onClick={this.registerUser}>
          Register User
        </button>
        <p>{this.props.errorMessage}</p>
        <p>{this.props.accountNumber}</p>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    accountNumber: state.user.accountNumber,
    email: state.user.email,
    errorMessage: state.misc.errorMessage,
    firstName: state.user.firstName,
    gender: state.user.gender,
    height: state.user.height,
    lastName: state.user.lastName,
    password: state.user.password,
    passwordCheck: state.misc.passwordCheck,
    username: state.user.username,
    weight: state.user.weight
  };
};

const mapDispatchToProps = {
  registerUser,
  updateErrorMessage,
  updateUserRegister
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterUser);
