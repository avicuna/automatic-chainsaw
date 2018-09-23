import * as React from 'react';
import { Container, } from 'mdbreact';

class FooterPage extends React.Component {
    public render(){
        return(
                <div className="footer-copyright text-center py-3">
                    <Container fluid>
                        &copy; {(new Date().getFullYear())} Copyright: GainTrain
                    </Container>
                </div>
        );
    }
}

export default FooterPage;