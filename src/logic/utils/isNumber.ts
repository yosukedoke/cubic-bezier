const isNumber =  (value: unknown): value is number => {
  return typeof value === 'number'&& !isNaN(value)
}

export default isNumber