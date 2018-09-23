import * as React from "react";
import gym from "../../assets/gym-background.jpg";
import { Container, Mask, View, CardGroup, CardBody, CardTitle, Fa } from "mdbreact";
import { HomeNavComponent } from "../navs/home-nav.component";
import FooterPage from "../footer/footer";

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
          <HomeNavComponent/>
          <View>
            <img
              src={gym}
              className="img-fluid"
            />
            <Mask
              overlay="black-light"
              style={{ flexDirection: "column" }}
              className="flex-center  text-white text-center"
            >
              <h1>FitTrack</h1>
              <h5>Fitness tracking made easier</h5>
            </Mask>
          </View>
        </header>
        <br/>
        <br/>
        <Container id="home-container" className="text-md-center">
            <CardGroup deck>
                    <CardBody>
                        <CardTitle tag="h5"><Fa icon="file-text" size="2x"/></CardTitle>
                        <br/>
                        <CardTitle tag="h6">Log your workouts by selecting from various workout types</CardTitle>
                    </CardBody>
                    <CardBody>
                        <CardTitle tag="h5"><Fa icon="list" size="2x"/></CardTitle>
                        <br/>
                        <CardTitle tag="h6">Choose from a variety of exercises</CardTitle>
                    </CardBody>
                    <CardBody>
                        <CardTitle tag="h5"><Fa icon="calendar" size="2x"/></CardTitle>
                        <br/>
                        <CardTitle tag="h6">View your previous workouts</CardTitle>
                    </CardBody>
            </CardGroup>
        </Container>
        <FooterPage/>
      </div>
    );
  }
}
