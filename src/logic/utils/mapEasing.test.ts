import { Linear } from '../easing'
import mapEasing from './mapEasing'

describe('Test of mapEasing()', () => {
  test('Generate mapFunction', () => {
    const fn = mapEasing(100, 1100, Linear)
    expect(fn).toBeInstanceOf(Function)
    expect(fn.length).toBe(1)
  })

  test('Use returned Function to map to value', () => {
    const fn = mapEasing(100, 1100, Linear)
    expect(fn(-0.5)).toBe(-400)
    expect(fn(0)).toBe(100)
    expect(fn(0.5)).toBe(600)
    expect(fn(1)).toBe(1100)
    expect(fn(2)).toBe(2100)
  })

  test('when from/to reverserd then values is exchanged', () => {
    const fn = mapEasing(1100, 100, Linear)
    expect(fn(0)).toBe(100)
    expect(fn(0.5)).toBe(600)
    expect(fn(1)).toBe(1100)
  })

  test('Can calcurate over range value', () => {
    const fn = mapEasing(100, 1100, Linear)
    expect(fn(-0.5)).toBe(-400)
    expect(fn(2)).toBe(2100)
  })
})