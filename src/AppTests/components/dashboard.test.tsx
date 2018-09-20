import * as React from 'react';
import { shallow } from 'enzyme';
import { Dashboard } from '../../components/dashboard/dashboard';


describe('<Dashboard/>', () => { // start of the tests for Create Users

    const DashboardProps: any = {
        getExerciseList: jest.fn(),
        exerciseList: [0, 0, 0],
        getWorkoutList: jest.fn(),
        getWorkoutHistory: jest.fn(),

    }

    it('Dashboard Component Renders', () => {// tests to check if the component will render
        // getExerciseList = 1;
        const wrapper = shallow(<Dashboard {...DashboardProps} />);
        expect(wrapper.length).toEqual(1);

    }); // end of check rendering test


    it('getExcersieList is invoked', () => { // testing to see if method is invoked

        const getExerciseListMock = jest.fn();
        const wrapper = shallow(<Dashboard  {...DashboardProps} getExerciseList={getExerciseListMock} />);


    });

    it('getWorkoutList is invoked', () => { // testing to see if method is invoked

        const getWorkoutListMock = jest.fn();
        const wrapper = shallow(<Dashboard  {...DashboardProps} getWorkoutList={getWorkoutListMock} />);


    });

    it('getWorkoutHistory is invoked', () => { // testing to see if method is invoked

        const getWorkoutHistoryMock = jest.fn();
        const wrapper = shallow(<Dashboard  {...DashboardProps} getWorkoutHistory={getWorkoutHistoryMock} />);


    });



});
