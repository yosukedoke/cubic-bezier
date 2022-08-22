import functionParser from './functionParser'

describe('Test of functionParser()', () => {
  const values = functionParser('funcName')

  describe('Return functions', () => {
    const { parse, stringify } = values

    test('Exist parse() function', () => {
      expect(parse).toBeInstanceOf(Function)
    })

    test('Exist stringify() function', () => {
      expect(stringify).toBeInstanceOf(Function)
    })
  })

  describe('Test of parse() Function ', () => {
    const { parse } = values
    const expectedError = new Error('Invalid Format')

    test('Valid format', () => {
      parse('funcName(0.1)')
      parse('funcName(1, 2, 3, 4)')
      parse('funcName(0.1,1.2)')
      parse('funcName(0.0,1.0,0.5,0.5)')
      parse('funcName(0.0, 1.0, 0.5, 0.5)')
      parse('funcName(.0, -1.0, .05, 0.5)')
    })

    test('InValid format', () => {
      expect(() => {
        parse('')
      }).toThrow(expectedError)

      expect(() => {
        parse('funcName')
      }).toThrow(expectedError)

      expect(() => {
        parse('funcName()')
      }).toThrow(expectedError)

      expect(() => {
        parse('hogeName(0.0,1.0,0.5,0.5)')
      }).toThrow(expectedError)

      expect(() => {
        parse('funcName(abc,def,hij)')
      }).toThrow(expectedError)
    })

    test('Get args', () => {
      const value1 = parse('funcName(0.1)')
      const value2 = parse('funcName(0.1,1.2)')
      const value4 = parse('funcName(0.0,1.0,0.5,0.5)')

      expect(value1).toEqual(['0.1'])
      expect(value2).toEqual(['0.1','1.2'])
      expect(value4).toEqual(['0.0', '1.0', '0.5', '0.5'])
    })

    test('Get args includes negative number', () => {
      const value1 = parse('funcName(-0.1)')
      const value2 = parse('funcName(0.1,-1.2)')
      const value4 = parse('funcName(0.0,-1.0,0.5,-0.5)')

      expect(value1).toEqual(['-0.1'])
      expect(value2).toEqual(['0.1','-1.2'])
      expect(value4).toEqual(['0.0', '-1.0', '0.5', '-0.5'])
    })


    test('Get args includes omitted number', () => {
      const value1 = parse('funcName(-.1)')
      const value2 = parse('funcName(.01,-.002)')

      expect(value1).toEqual(['-.1'])
      expect(value2).toEqual(['.01','-.002'])
    })
  })


  describe('Test of stringify() Function ', () => {
    const { parse, stringify } = values

    test('stringify() returns string', () => {
      expect(stringify([1, 2, 4, 5])).toBe('funcName(1, 2, 4, 5)')
      expect(stringify([0.123, .002, -4.3, 5.2])).toBe('funcName(0.123, 0.002, -4.3, 5.2)')
    })

    test('Returned string can parse', () => {
      const value = stringify([1, 2, 4, 5])
      expect(parse(value)).toEqual(['1', '2', '4', '5'])
    })
  })
})