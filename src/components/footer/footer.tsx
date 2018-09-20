import * as React from 'react';
import { Container, Footer} from 'mdbreact';

class FooterPage extends React.Component {
    public render(){
        return(
            <Footer color="blue" className="font-small pt-4 mt-4">
                <div className="footer-copyright text-center py-3">
                    <Container fluid>
                        &copy; {(new Date().getFullYear())} Copyright: GainTrain
                    </Container>
                </div>
            </Footer>
        );
    }
}

export default FooterPage;