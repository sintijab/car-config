import React from 'react'
import { shallow } from 'enzyme'
import Loader from '../src/widgets/Loader'

describe('Loader', () => {
  it('should render', () => {
    const component = shallow(<Loader />)
    expect(component).toMatchSnapshot()
  })
})
