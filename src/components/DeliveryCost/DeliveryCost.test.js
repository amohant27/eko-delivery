import React from 'react';
import { inputRouteMap} from '../../util/directedGraph';
import DeliveryCost from './DeliveryCost';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({ adapter: new Adapter() });

it('should render routes with default data', () => {
    const wrapper = shallow(<DeliveryCost  />);
    const graphData = wrapper.find('inputRouteMap');
    expect(inputRouteMap.length).toEqual(10);
});

it('should render ref', () => {
    const wrapper = shallow(<DeliveryCost />);
    expect(wrapper.instance().pathInput).toBeTruthy()
})

it('calcCost click event', () => {
    const spy = jest.spyOn(DeliveryCost.prototype, 'calcCost');
    const wrapper = shallow(<DeliveryCost />);
    const calCostButton = wrapper.find('#calCost');
    calCostButton.simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
});


it('calcCost click event on being empty', () => {
    const wrapper = shallow(<DeliveryCost />);
    const calCostButton = wrapper.find('#calCost');
    calCostButton.simulate('click');
    const text = wrapper.find('.error-dc').text();
    expect(text).toEqual(' Route cannot be empty');
});