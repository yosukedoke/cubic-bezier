const clamp = (value: number, a: number, b: number) => {
  if (a === b) throw new Error('Invalid arguments.')
  
  const min = Math.min(a, b)
  const max = Math.max(a, b)
  return Math.max(min, Math.min(max, value))
}

export default clamp