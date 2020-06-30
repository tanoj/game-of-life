import React from 'react';
import { shallow } from 'enzyme';
import Game from '../../my-app/src/components/Game';
describe('MyComponent', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Game debug />);
  
    expect(component).toMatchSnapshot();
  });
});