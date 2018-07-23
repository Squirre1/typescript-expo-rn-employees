import * as React from 'react'
import * as renderer from 'react-test-renderer'

import { Text } from 'react-native'
import { mount } from 'enzyme'
import * as chai from 'chai'

import Avatar from './Avatar'

it('renders without crashing', () => {
  const rendered = renderer.create(<Avatar uri="https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"/>).toJSON()
  expect(rendered).toMatchSnapshot()
  expect(rendered).toBeTruthy()
})

it('renders letters if uri not defined', () => {
  const wrapper = mount(<Avatar title="MM" />);
  chai.expect(wrapper.find(Text)).to.have.length(1);
})
