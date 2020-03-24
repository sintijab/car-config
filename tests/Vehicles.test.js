import { renderHook } from '@testing-library/react-hooks'
import vehicles from '../src/components/Vehicles'

describe('Vehicles', () => {
  it('should listen Vehicles hook by versions update', () => {
    const props = {
      data: [{
        model: 'Test',
        enginePowerPS: 123,
        enginePowerKW: 123,
        fuelType: '',
        bodyType: '',
        engineCapacity: 123,
      }],
      errorMessage: '',
      loading: false,
    }
    const { result } = renderHook(() => vehicles(props))
    //result.current.versions
    expect(result.current).toEqual(undefined)
  })
})
