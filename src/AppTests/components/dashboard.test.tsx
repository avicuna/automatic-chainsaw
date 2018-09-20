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


    it('getExcersieList is invoked', () => { // testing to see if method is defined

        const getExerciseListMock = jest.fn();
        const wrapper = shallow(<Dashboard  {...DashboardProps} getExerciseList={getExerciseListMock} />);
        expect(getExerciseListMock).toBeDefined()

    });

    it('getWorkoutList is invoked', () => { // testing to see if method is defined

        const getWorkoutListMock = jest.fn();
        const wrapper = shallow(<Dashboard  {...DashboardProps} getWorkoutList={getWorkoutListMock} />);
        expect(getWorkoutListMock).toBeDefined();

    });

    it('getWorkoutHistory is invoked', () => { // testing to see if method is defined

        const getWorkoutHistoryMock = jest.fn();
        const wrapper = shallow(<Dashboard  {...DashboardProps} getWorkoutHistory={getWorkoutHistoryMock} />);
        expect(getWorkoutHistoryMock).toBeDefined();


    });



});
