import isNumber from  './isNumber'

describe('Test of isNumber()', () => {
  test('Valid number', () => {
    expect(isNumber(0)).toBe(true)
    expect(isNumber(1)).toBe(true)
    expect(isNumber(1.0)).toBe(true)
    expect(isNumber(.1)).toBe(true)
    expect(isNumber(-1.0)).toBe(true)
    expect(isNumber(-.1)).toBe(true)
    expect(isNumber(0x12)).toBe(true)
    expect(isNumber(Math.PI)).toBe(true)
  })

  test('Invalid number', () => {
    expect(isNumber(undefined)).toBe(false)
    expect(isNumber(null)).toBe(false)
    expect(isNumber('1.0')).toBe(false)
    expect(isNumber('')).toBe(false)
    expect(isNumber('abc')).toBe(false)
  })
})