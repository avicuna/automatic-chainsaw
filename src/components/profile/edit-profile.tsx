import * as React from "react";
import { connect } from "react-redux";
import { IState } from "../../reducers";
import {IUserInfo, updateUserRegister} from "../../actions/register-user/register-user.actions";
import {RouteComponentProps} from "react-router";


interface IProps extends RouteComponentProps<{}> {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    height: number;
    weight: number;
    gender: string;
    updateUserRegister: (info: IUserInfo) => any;
}

export class EditProfile extends React.Component<IProps, any> {
    constructor(props: any) {
        super(props);
        // remember to bind your functions here
    }

    public render() {
        return (
            <div>
                <p className="h3-responsive text-center">Edit Profile Page</p>
            </div>
        );
    }
}
const mapStateToProps = (state: IState) => {
    return {
        email: state.user.email,
        firstName: state.user.firstName,
        gender: state.user.gender,
        height: state.user.height,
        lastName: state.user.lastName,
        password: state.user.password,
        username: state.user.username,
        weight: state.user.weight
    };
};

const mapDispatchToProps = {
    updateUserRegister
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditProfile);
