import { renderHook } from '@testing-library/react-hooks'
import navigation from '../src/components/Navigation'

describe('Navigation', () => {
  it('should listen Navigations hook by activeItem update', () => {
    const initialProps = {
      items: ['Models', 'Versions', 'Vehicles'],
      activeSection: 'Models',
      updateSection: jest.fn(),
    }
    const { result } = renderHook(() => navigation(initialProps))
    //result.current.activeItem
    expect(result.current).toEqual(undefined)
  })
})
