import * as React from "react";
import { Container, Mask, View } from "mdbreact";
import { HomeNavComponent } from "../navs/home-nav.component";
import FooterPage from "../footer/footer";
// import {NavComponent} from "../navs/nav.component";

export class HomeComponent extends React.Component<any, any> {
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
      <div>
        <header>
          <HomeNavComponent />
          <View>
            <img
              src="https://mdbootstrap.com/img/Photos/Others/img%20(40).jpg"
              className="img-fluid"
            />
            <Mask
              overlay="purple-light"
              style={{ flexDirection: "column" }}
              className="flex-center  text-white text-center"
            >
              <h1>FitTrack</h1>
              <h5>We help you track and analyze your workouts</h5>
            </Mask>
          </View>
        </header>
        <Container className="text-center my-5">
          <p>
            Gallia est omnis divisa in partes tres, quarum unam incolunt Belgae,
            aliam Aquitani, tertiam qui ipsorum lingua Celtae, nostra Galli
            appellantur. Hi omnes lingua, institutis, legibus inter se
            differunt. Gallos ab Aquitanis Garumna flumen, a Belgis Matrona et
            Sequana dividit. Horum omnium fortissimi sunt Belgae, propterea quod
            a cultu atque humanitate provinciae longissime absunt, minimeque ad
            eos mercatores saepe commeant atque ea quae ad effeminandos animos
            pertinent important, proximique sunt Germanis, qui trans Rhenum
            incolunt, quibuscum continenter bellum gerunt.
          </p>
        </Container>
        <FooterPage />
      </div>
    );
  }
}
