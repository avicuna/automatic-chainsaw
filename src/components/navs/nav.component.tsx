import * as React from 'react';
import logo from '../../logo.svg';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink } from 'mdbreact';

export class NavComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false,
        };
        this.onClick = this.onClick.bind(this);
    }

    public onClick(){
        this.setState({
            collapse: !this.state.collapse,
        });
    }
    public render() {
        return (
            <Navbar dark color="unique-color" expand="md" scrolling>
                <NavbarBrand>
                    <img className="img-adjust-position rev-logo" src={logo} alt="FT"/>
                </NavbarBrand>
                { !this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
                <Collapse isOpen = { this.state.collapse } navbar>
                    <NavbarNav left>
                    </NavbarNav>
                    <NavbarNav right>
                        <NavItem>
                            <NavLink to="/login">Log In</NavLink>
                        </NavItem>
                    </NavbarNav>
                </Collapse>
            </Navbar>
        );
    }
}
