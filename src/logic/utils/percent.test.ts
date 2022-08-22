import percent from './percent'

describe('Test of percent()', () => {
  test('When duration is 3000ms and time is 1500sec, then percent returns 0.5', () => {
    expect(percent(3000)(1500)).toBe(0.5)
  })

  test('When duration is 3000ms with offset time 1000ms and time is 3000sec, then percent returns 0.666666666...', () => {
    expect(percent(3000, 1000)(3000)).toBe(2/3)
  })

  test('percent is clamp between 0 to 1', () => {
    expect(percent(3000, 1000)(0)).toBe(0)
    expect(percent(3000)(4500)).toBe(1)
  })
})