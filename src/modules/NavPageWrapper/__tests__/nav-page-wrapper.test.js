import React from 'react';
import renderer from 'react-test-renderer';
import NavPageWrapper from '../index';

it('renders correctly', () => {
  const component = renderer.create(
    <NavPageWrapper />
  ).toJSON();
  expect(component).toMatchSnapshot();
});
