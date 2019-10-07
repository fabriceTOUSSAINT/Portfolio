import React from 'react';
import renderer from 'react-test-renderer';
import FlexNav from '../index';

it('renders correctly', () => {
  const component = renderer.create(
    <FlexNav />
  ).toJSON();
  expect(component).toMatchSnapshot();
});
