import percent from './percent'

describe('Test of percent()', () => {

  test('Not clamp when the number in range', () => {
    expect(percent(0, 10)(5)).toBe(0.5)
  })

  // test('Clamp number into range', () => {
  //   expect(clamp(-1, 0, 10)).toBe(0)
  //   expect(clamp(11, 0, 10)).toBe(10)
  // })

  // test('When also min/max was reversed, can clamp number', () => {
  //   expect(clamp(-1, 10, 0)).toBe(0)
  //   expect(clamp(11, 10, 0)).toBe(10)
  // })

  // test('If args "a" same "b", then throw Erorr', () => {
  //   const expectedError= new Error('Invalid arguments.')
  //   expect(() => {
  //     clamp(1, 0, 0)
  //   }).toThrow(expectedError)

  //   expect(() => {
  //     clamp(1, 10, 10)
  //   }).toThrow(expectedError)
  // })
})