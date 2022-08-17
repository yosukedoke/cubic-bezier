import { CubicBezier } from './easing'

describe('Test of CubicBezier())', () => {
  test('Same Lienar', () => {
    const fn = CubicBezier(0, 0, 1, 1)
    expect(fn(0)).toBe(0)
    expect(fn(0.5)).toBe(0.5)
    expect(fn(1)).toBe(1)
  })
})