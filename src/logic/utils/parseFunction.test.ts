import parseFunction from './parseFunction'

describe('Test of parseFunction()', () => {
  const fn = parseFunction('funcName')

  test('Return Function instance', () => {
    expect(fn).toBeInstanceOf(Function)
  })

  describe('Test of Returned Function ', () => {
    const expectedError = new Error('Invalid Format')

    test('Valid format', () => {
      fn('funcName(0.1)')
      fn('funcName(0.1,1.2)')
      fn('funcName(0.0,1.0,0.5,0.5)')
      fn('funcName(0.0, 1.0, 0.5, 0.5)')
      fn('funcName(.0, -1.0, .05, 0.5)')
    })

    test('InValid format', () => {
      expect(() => {
        fn('')
      }).toThrow(expectedError)

      expect(() => {
        fn('funcName')
      }).toThrow(expectedError)

      expect(() => {
        fn('funcName()')
      }).toThrow(expectedError)

      expect(() => {
        fn('hogeName(0.0,1.0,0.5,0.5)')
      }).toThrow(expectedError)

      expect(() => {
        fn('funcName(abc,def,hij)')
      }).toThrow(expectedError)
    })

    test('Get args', () => {
      const value1 = fn('funcName(0.1)')
      const value2 = fn('funcName(0.1,1.2)')
      const value4 = fn('funcName(0.0,1.0,0.5,0.5)')

      expect(value1).toEqual(['0.1'])
      expect(value2).toEqual(['0.1','1.2'])
      expect(value4).toEqual(['0.0', '1.0', '0.5', '0.5'])
    })

    test('Get args includes negative number', () => {
      const value1 = fn('funcName(-0.1)')
      const value2 = fn('funcName(0.1,-1.2)')
      const value4 = fn('funcName(0.0,-1.0,0.5,-0.5)')

      expect(value1).toEqual(['-0.1'])
      expect(value2).toEqual(['0.1','-1.2'])
      expect(value4).toEqual(['0.0', '-1.0', '0.5', '-0.5'])
    })


    test('Get args includes omitted number', () => {
      const value1 = fn('funcName(-.1)')
      const value2 = fn('funcName(.01,-.002)')

      expect(value1).toEqual(['-.1'])
      expect(value2).toEqual(['.01','-.002'])
    })
  })
})