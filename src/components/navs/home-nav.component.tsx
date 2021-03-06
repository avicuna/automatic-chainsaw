import * as React from "react";
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink, Fa} from "mdbreact";

export class HomeNavComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false
    };
    this.onClick = this.onClick.bind(this);
  }

  public onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  public render() {
    return (
      <Navbar color="transparent" dark expand="md" fixed="top" scrolling>
        <NavbarBrand>
          <i className="rev-logo fa fa-pied-piper" />
        </NavbarBrand>
        {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />}
        <Collapse isOpen={this.state.collapse} navbar>
          <NavbarNav left />
          <NavbarNav right>
            <NavItem>
              <NavLink to="/login">Log In <Fa icon="sign-in"/></NavLink>
            </NavItem>
          </NavbarNav>
        </Collapse>
      </Navbar>
    );
  }
}
