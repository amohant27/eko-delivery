import React from 'react';
import { inputRouteMap } from '../../util/directedGraph';
import PossibleRoutes from './PossibleRoutes';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({ adapter: new Adapter() });

it('should render routes with routeMap', () => {
    const wrapper = shallow(<PossibleRoutes />);
    const graphData = wrapper.find('inputRouteMap');
    expect(inputRouteMap.length).toEqual(10);
});

it('should have a source input', () => {
    const wrapper = shallow(<PossibleRoutes />);
    expect(wrapper.instance().srcInput).toBeTruthy()
})
it('should have a source destination', () => {
    const wrapper = shallow(<PossibleRoutes />);
    expect(wrapper.instance().destInput).toBeTruthy()
})

it('getPossibleNodes click event', () => {
    const spy = jest.spyOn(PossibleRoutes.prototype, 'getPossibleNodes');
    const wrapper = shallow(<PossibleRoutes />);
    const findNodesBtn = wrapper.find('#findNodesBtn');
    findNodesBtn.simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
});


it('getCheapestRoute click event', () => {
    const spy = jest.spyOn(PossibleRoutes.prototype, 'getPossibleNodes');
    const getCheapestRouteSpy = jest.spyOn(PossibleRoutes.prototype, 'getCheapestRoute');
    const wrapper = shallow(<PossibleRoutes />);
    const findNodesBtn = wrapper.find('#findNodesBtn');
    findNodesBtn.simulate('click');
    expect(spy).toHaveBeenCalledTimes(2);
    expect(getCheapestRouteSpy).toHaveBeenCalledTimes(0);
});


it('calcCost click event on being empty', () => {
    const wrapper = shallow(<PossibleRoutes />);
    const findNodesBtn = wrapper.find('#findNodesBtn');
    findNodesBtn.simulate('click');
    const text = wrapper.find('.error-pr').text();
    expect(text).toEqual(' Incorrect Value, Please enter correct Route Code');
});