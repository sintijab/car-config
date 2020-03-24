import { renderHook } from '@testing-library/react-hooks'
import board from '../src/components/Board'
import * as mockedRes from '../apiserver/makes.json'

describe('Board', () => {
  it('should listen Boards hook by options update', () => {
    const initialProps = {
      data: ['ALFA ROMEO', 'AUDI', 'AUSTIN', 'BARKAS', 'BMW'],
      activeSection: 'Models',
      errorMessage: '',
      loading: false,
      filter: {
        model: null,
        vehicles: null,
        version: null
      },
      getData: jest.fn(),
      setFilter: jest.fn(),
    }

    const { result } = renderHook(() => board(initialProps))
    //result.current.options
    expect(result.current).toEqual(undefined)
  })
})
