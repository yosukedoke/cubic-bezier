import clamp from './clamp'

describe('Test of clamp()', () => {
  test('Not clamp when the number in range', () => {
    expect(clamp(0, 0, 5)).toBe(0)
    expect(clamp(1, 0, 5)).toBe(1)
    expect(clamp(2, 0, 5)).toBe(2)
    expect(clamp(3, 0, 5)).toBe(3)
    expect(clamp(4, 0, 5)).toBe(4)
    expect(clamp(5, 0, 5)).toBe(5)
  })

  test('Clamp number into range', () => {
    expect(clamp(-1, 0, 10)).toBe(0)
    expect(clamp(11, 0, 10)).toBe(10)
  })

  test('When also min/max was reversed, can clamp number', () => {
    expect(clamp(-1, 10, 0)).toBe(0)
    expect(clamp(11, 10, 0)).toBe(10)
  })

  test('If args "a" same "b", then throw Erorr', () => {
    const expectedError= new Error('Invalid arguments.')
    expect(() => {
      clamp(1, 0, 0)
    }).toThrow(expectedError)

    expect(() => {
      clamp(1, 10, 10)
    }).toThrow(expectedError)
  })
})