import * as React from "react";
import { connect } from "react-redux";
import logo from "../../logo.svg";
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink } from "mdbreact";
import { IState } from "../../reducers";
import { RouteComponentProps } from 'react-router';
import { logoutUser } from "../../actions/logout/logout.actions";
import { clearSuccess } from "../../actions/misc/misc.actions";

interface IProps extends RouteComponentProps<{}> {
  userName: string,
  logoutUser: () => any
  clearSuccess: () => any
}

export class NavComponent extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false
    };
    this.onClick = this.onClick.bind(this);
    this.logout = this.logout.bind(this);
  }

  public onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  public logout(e: any) {
    e.preventDefault();
    this.props.logoutUser();
    this.props.clearSuccess();
    this.props.history.push("/home");
  }

  public render() {
    return (
      <Navbar dark color="unique-color" expand="md" scrolling>
        <NavbarBrand>
          <img className="img-adjust-position rev-logo" src={logo} alt="FT" />
        </NavbarBrand>
        {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />}
        <Collapse isOpen={this.state.collapse} navbar>
          <NavbarNav left>
            <NavItem>
              <NavLink to="/dashboard">Workout History</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/new-workout">Create Workout</NavLink>
            </NavItem>
          </NavbarNav>
          <NavbarNav right>
            <NavItem>
              <NavLink to="/profile">Profile</NavLink>
            </NavItem>
            <NavItem>
               <NavLink to="" onClick={this.logout}>Log Out</NavLink>
            </NavItem>
          </NavbarNav>
        </Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
      userName: state.user.firstName
  }
};

const mapDispatchToProps = {
  logoutUser,
  clearSuccess
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavComponent);
