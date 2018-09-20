import * as React from 'react';
import { shallow } from 'enzyme';
import { Dashboard } from '../../components/dashboard/dashboard';


describe('<Dashboard/>', () => { // start of the tests for Create Users

    const DashboardProps : any = {
        getExerciseList: jest.fn(),
        exerciseList: [0,0,0]

    }
    
    it('Dashboard Component Renders', () => {// tests to check if the component will render
        // getExerciseList = 1;
        const wrapper = shallow(<Dashboard {...DashboardProps} />);
        expect(wrapper.length).toEqual(1);
    
    }); // end of check rendering test

});
