import * as React from 'react';
import { Container, Mask, View } from 'mdbreact';
import {NavComponent} from "../navs/nav.component";
// import {NavComponent} from "../navs/nav.component";

export class HomeComponent extends React.Component<any, any> {
    constructor(props: any){
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false,
        };
        this.onClick = this.onClick.bind(this);
    }

    public onClick() {
        this.setState({
            collapse: !this.state.collapse,
        });
    }



    public render() {
        return (
            <div>
                <header>
                    <NavComponent/>

                    <View >
                        <img src="https://mdbootstrap.com/img/Photos/Others/img%20(40).jpg" className="img-fluid"/>
                        <Mask overlay="purple-light" style={{flexDirection: 'column'}} className="flex-center  text-white text-center">
                            <h1>FitTrack</h1>
                            <h5>It will always stay visible on the top, even when you scroll down</h5>
                            <p>Navbar's background will switch from transparent to solid color while scrolling down</p><br/>
                            <p>Full page intro with background image will be always displayed in full screen mode, regardless of device </p>
                        </Mask>
                    </View>
                </header>
                <Container className="text-center my-5">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </Container>
                {/*<NavComponent/>*/}
                {/*<div id="intro" className="jumbotron text-center">*/}
                    {/*<h1>FitTrac</h1>*/}
                    {/*<p>We specialize in blablabla</p>*/}
                {/*</div>*/}
                {/*<div id="about" className="container-fluid">*/}
                    {/*<div className="row">*/}
                        {/*<div className="col-sm-8">*/}
                            {/*<h2>About Company Page</h2>*/}
                            {/*<h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor*/}
                                {/*incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud*/}
                                {/*exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h4>*/}
                            {/*<p>*/}
                                {/*Gallia est omnis divisa in partes tres, quarum unam incolunt Belgae, aliam Aquitani,*/}
                                {/*tertiam qui ipsorum lingua Celtae, nostra Galli appellantur. Hi omnes lingua, institutis,*/}
                                {/*legibus inter se differunt. Gallos ab Aquitanis Garumna flumen, a Belgis Matrona et Sequana dividit.*/}
                                {/*Horum omnium fortissimi sunt Belgae, propterea quod a cultu atque humanitate provinciae longissime absunt,*/}
                                {/*minimeque ad eos mercatores saepe commeant atque ea quae ad effeminandos animos pertinent important,*/}
                                {/*proximique sunt Germanis, qui trans Rhenum incolunt, quibuscum continenter bellum gerunt.*/}
                            {/*</p>*/}
                            {/*<button className="btn btn-default btn-lg">Get in Touch</button>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                        {/*<div className="col-sm-4">*/}
                            {/*<span className="glyphicon glyphicon-signal logo"/>*/}
                        {/*</div>*/}
                    {/*</div>*/}
            </div>
        );
    }
}
