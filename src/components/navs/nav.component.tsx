import * as React from "react";
import { connect } from "react-redux";
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse,
        NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, Fa} from "mdbreact";
import { IState } from "../../reducers";
import { RouteComponentProps } from "react-router";
import { logoutUser } from "../../actions/logout/logout.actions";
import { clearSuccess } from "../../actions/misc/misc.actions";

interface IProps extends RouteComponentProps<{}> {
  userName: string;
  logoutUser: () => any;
  clearSuccess: () => any;
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
      <Navbar dark color="primary-color" expand="md" scrolling>
        <NavbarBrand>
            <i className="rev-logo fa fa-pied-piper" />
        </NavbarBrand>
        {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />}
        <Collapse isOpen={this.state.collapse} navbar>
          <NavbarNav left>
              <NavItem>
                  <NavLink to="/dashboard">Dashboard</NavLink>
              </NavItem>
            <NavItem>
              <NavLink to="/view-workout-history">Workout History</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/new-workout">Create Workout</NavLink>
            </NavItem>
          </NavbarNav>
          <NavbarNav right>
              <div id="user">
                  <Dropdown>
                      <DropdownToggle caret color="mdb-color" size="sm">
                          {this.props.userName}
                      </DropdownToggle>
                      <DropdownMenu>
                          <NavLink to="/profile">Profile</NavLink>
                          <NavLink to="" onClick={this.logout}>Log Out <Fa icon="sign-out"/></NavLink>
                      </DropdownMenu>
                  </Dropdown>
              </div>
          </NavbarNav>
        </Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
      userName: state.user.username
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
