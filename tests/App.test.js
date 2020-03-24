import React from 'react'
import { shallow } from 'enzyme'
import { renderHook, act } from '@testing-library/react-hooks'
import axios from 'axios'
jest.mock('axios')

import app from '../src/App'
import * as mockedRes from '../apiserver/makes.json'

describe('App', () => {
  it('should update models after successful request', async () => {
    axios.get.mockResolvedValueOnce({ data: mockedRes })
    const { result, waitForNextUpdate } = renderHook(() => app())
    await waitForNextUpdate()
    // result.current.models
    expect(result.current).toBe(undefined)
  })
})
