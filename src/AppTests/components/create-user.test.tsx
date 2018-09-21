import * as React from 'react';
import { shallow } from 'enzyme';
import { CreateUser } from '../../components/create-user/create-user'



describe('<CreateUser/>', () => { // start of the tests for Create Users

    it('Create User Component Renders', () => {// tests to check if the component will render

        const wrapper = shallow(<CreateUser/>);
        expect(wrapper.length).toEqual(1);

    }); // end of check rendering test


});

