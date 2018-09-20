import * as React from "react";
import { connect } from "react-redux";
import { IState } from "../reducers";
import { changeUsernameAndPassword } from "../actions/login/login.actions";
import { submitLogin } from "../actions/login/login.actions";
import "../App.css";
import {RouteComponentProps} from "react-router";
import {getExerciseList,getWorkoutList} from "../actions/info/info.actions";
import { Container, Row, Col, Input, Button } from 'mdbreact';

interface IProps extends RouteComponentProps<{}>{
  errorMessage: string;
  username: string;
  password: string;
  accountNumber: string;
  getWorkoutList:() => any;
  loginSuccess: boolean;
  changeUsernameAndPassword: (username: string, password: string) => any;
  submitLogin: (logUsername: string, logPassword: string) => any;
  getExerciseList: any;
}

class Login extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
    this.updateLogin = this.updateLogin.bind(this);
    this.login = this.login.bind(this);
    this.route = this.route.bind(this);
  }
  public login(e: any) {
    e.preventDefault();
    this.props.submitLogin(this.props.username, this.props.password);
    if(this.props.errorMessage === "") {
        this.props.history.push("/dashboard");
    }
  }
  public updateLogin(e: any) {
    e.preventDefault();
    if (e.target.id === "UN") {
      this.props.changeUsernameAndPassword(e.target.value, this.props.password);
    } else {
      this.props.changeUsernameAndPassword(this.props.username, e.target.value);
    }
  }

  public route(e: any) {
      e.preventDefault();
      this.props.history.push("/sign-up");
  }

  public componentDidMount() {
    this.props.getExerciseList();

    this.props.getWorkoutList();
  }
  public render() {
      window.console.log(this.props.loginSuccess);
      if(this.props.loginSuccess){
          this.props.history.push("/dashboard");
      }
    return (
      <div>

          <Container id="sign-in-container">
              <Row>
                  <Col md="6">
                      <form>
                          <p className="h5 text-center mb-4">Log in</p>
                          <div className="grey-text">
                              <Input label="Enter username"
                                     id="UN"
                                     icon="user"
                                     group type="text"
                                     validate error="wrong"
                                     success="right"
                                     value={this.props.username}
                                     onChange={this.updateLogin}
                              />
                              <Input label="Enter password"
                                     icon="lock"
                                     group type="password"
                                     validate
                                     value={this.props.password}
                                     onChange={this.updateLogin}
                              />
                          </div>
                          <div className="text-center">
                              <p className="font-small blue-text d-flex justify-content-end pb-3">Not a member?<a onClick={this.route} className="blue-text ml-1">Sign up here</a></p>
                              <p id="error-message">{this.props.errorMessage}</p>
                              <Button onClick={this.login}>Login</Button>
                          </div>
                      </form>
                  </Col>
              </Row>
          </Container>
      </div>
    );
  }
}
const mapStateToProps = (state: IState) => {
  return {
    accountNumber: state.user.accountNumber,
    errorMessage: state.misc.errorMessage,
    password: state.user.password,
    username: state.user.username,
    loginSuccess: state.misc.loginSuccess

  };
};

const mapDispatchToProps = { getExerciseList, submitLogin,getWorkoutList, changeUsernameAndPassword };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
