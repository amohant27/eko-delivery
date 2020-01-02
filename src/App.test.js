import React from 'react';
import App from './App';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({ adapter: new Adapter() });

it('should render input with a class', () => {
  const app = shallow(<App />);
  expect(app.hasClass('App')).toEqual(true);
});
