import * as React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../../components/login';


 describe('Login/>', () => { // start of the tests for Create Users

    const loginProps: any = { 
        // errorMessage: "",
             username: "",
             password: "",
        // accountNumber: "",s
        getWorkoutList: jest.fn(),
        // loginSuccess: false,
        // changeUsernameAndPassword: jest.fn(),
         submitLogin: jest.fn(),
        getExerciseList: jest.fn(),
        // history: jest.fn(),
        // location: jest.fn(),
        // match: jest.fn()
        // changeUsernameAndPassword: jest.fn(),
    }


    it('Login Component Renders', () => {// tests to check if the component will render
        const wrapper = shallow(<Login {...loginProps} />);
        expect(wrapper.length).toEqual(1);

    }); // end of check rendering test

    it('changeUsernameAndPassword', () => {
      const submitLoginMock = jest.fn();
      

        shallow(<Login {...loginProps} submitLogin = 
        {submitLoginMock}/>);
        expect(submitLoginMock).toBeDefined();


    });

});