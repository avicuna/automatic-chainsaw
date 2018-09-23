import * as React from "react";
import { connect } from "react-redux";
import { IState } from "../../reducers";
import {IUpdateInfo, update, updateUser} from "../../actions/register-user/register-user.actions";
import {RouteComponentProps} from "react-router";
import {Button, Container, Input, Row} from "mdbreact";
import NavComponent from "../navs/nav.component";


interface IProps extends RouteComponentProps<{}> {
    accountNumber: number,
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    height: number;
    weight: number;
    gender: string;
    passwordCheck: string;
    update: (info: IUpdateInfo) => any;
    updateUser: (info: IUpdateInfo) => any;
}



export class EditProfile extends React.Component<IProps, any> {
    constructor(props: any) {
        super(props);
        this.updateUser = this.updateUser.bind(this);
        this.update = this.update.bind(this);
    }

    public update(e: any) {
        const info: IUpdateInfo = {
            accountNumber: this.props.accountNumber,
            email: this.props.email,
            firstName: this.props.firstName,
            height: this.props.height,
            lastName: this.props.lastName,
            weight: this.props.weight
        }
        this.props.update(info);
        this.props.history.push("/profile");
    }

    public updateUser(e: any) {
        e.preventDefault();
        const info: IUpdateInfo = {
            accountNumber: this.props.accountNumber,
            email: this.props.email,
            firstName: this.props.firstName,
            height: this.props.height,
            lastName: this.props.lastName,
            weight: this.props.weight
        };


        switch (e.target.id) {
            case "EM":
                this.props.updateUser({
                    ...info,
                    email: e.target.value
                });
                break;
            case "FN":
                this.props.updateUser({
                    ...info,
                    firstName: e.target.value
                });
                break;
            case "LN":
                this.props.updateUser({
                    ...info,
                    lastName: e.target.value
                });
                break;
            case "HT":
                this.props.updateUser({
                    ...info,
                    height: e.target.value
                });
                break;
            case "WT":
                this.props.updateUser({
                    ...info,
                    weight: e.target.value
                });
                break;
            default:
                this.props.updateUser(info);
        }
    }

    public render() {
        return (
            <div>
                <NavComponent history={this.props.history}/>
                <br/>
                <br/>
                <br/>
                <p className="h3-responsive text-center">Edit Profile</p>
                <Container>
                    <Row>
                        <form>
                            <div id="profile">
                                <p className="h3-responsive">
                                    Account details
                                </p>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Input
                                            id="FN"
                                            type="text"
                                            className="form-control"
                                            label="First Name"
                                            value={this.props.firstName}
                                            onChange={this.updateUser}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <Input
                                            id="LN"
                                            type="text"
                                            className="form-control"
                                            label="Last Name"
                                            value={this.props.lastName}
                                            onChange={this.updateUser}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <Input
                                            id="EM"
                                            type="text"
                                            className="form-control"
                                            label="Email"
                                            value={this.props.email}
                                            onChange={this.updateUser}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div id="profile">
                                <p className="h3-responsive">User Information</p>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Input
                                            id="HT"
                                            type="number"
                                            className="form-control"
                                            label="Height (in)"
                                            value={this.props.height}
                                            onChange={this.updateUser}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <Input
                                            id="WT"
                                            type="number"
                                            className="form-control"
                                            label="Weight (lbs)"
                                            value={this.props.weight}
                                            onChange={this.updateUser}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <Button className="btn btn-primary" onClick={this.update}>
                                    Update
                                </Button>
                            </div>
                        </form>
                    </Row>
                </Container>
            </div>
        );
    }
}
const mapStateToProps = (state: IState) => {
    return {
        accountNumber: state.user.accountNumber,
        email: state.user.email,
        firstName: state.user.firstName,
        height: state.user.height,
        lastName: state.user.lastName,
        weight: state.user.weight
    };
};

const mapDispatchToProps = {
    updateUser,
    update
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditProfile);
