import * as React from "react";
import { connect } from "react-redux";
import { IState } from "../reducers";
import { changeUsernameAndPassword } from "../actions/login/login.actions";
import { submitLogin } from "../actions/login/login.actions";
import "../App.css";
import { RouteComponentProps } from "react-router";
interface IProps extends RouteComponentProps<{}> {
  errorMessage: string;
  username: string;
  password: string;
  accountNumber: string;

  changeUsernameAndPassword: (username: string, password: string) => any;
  submitLogin: (logUsername: string, logPassword: string) => any;
}

class Login extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
    this.updateLogin = this.updateLogin.bind(this);
    this.login = this.login.bind(this);
  }
  public login(e: any) {
    e.preventDefault();
    this.props.submitLogin(this.props.username, this.props.password);
    if (this.props.errorMessage === "") {
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
  public render() {
    return (
      <div>
        <div className="form-group">
          <label>Username</label>
          <br />
          <input
            id="UN"
            type="username"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter username"
            value={this.props.username}
            onChange={this.updateLogin}
          />
        </div>
        <br />
        <div className="form-group">
          <label>Password</label>
          <br />
          <input
            id="PW"
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={this.props.password}
            onChange={this.updateLogin}
          />
        </div>
        <br />
        <button type=" button" className="btn btn-primary" onClick={this.login}>
          Login
        </button>
        <p> {this.props.accountNumber}</p>
        <p> {this.props.errorMessage} </p>
      </div>
    );
  }
}
const mapStateToProps = (state: IState) => {
  return {
    accountNumber: state.user.accountNumber,
    errorMessage: state.misc.errorMessage,
    password: state.user.password,
    username: state.user.username
  };
};

const mapDispatchToProps = { submitLogin, changeUsernameAndPassword };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
