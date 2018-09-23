import * as React from "react";
import { connect } from "react-redux";
import logo from "../../logo.svg";
import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarToggler,
  Collapse,
  NavItem,
  NavLink
} from "mdbreact";
import { IState } from "../../reducers";
import { RouteComponentProps } from 'react-router';
import { logoutUser } from "../../actions/logout/logout.actions";

interface IProps extends RouteComponentProps<{}> {
  userName: string,
  logoutUser: () => any
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
    this.props.history.push("/home");
    // this.props.history.push("/home");
    console.log(this.props.userName);
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
              <NavLink to="/view-workout-history">Workout History</NavLink>
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
              {/* <NavLink onClick={this.logout}>Log Out</NavLink> */}
              <span onClick={this.logout}>Logout</span>
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
  logoutUser
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavComponent);
