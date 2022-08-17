const toArray = <T>(value: IterableIterator<RegExpMatchArray>) => {
  return Array.from(value, m => m[0])
}

const parseFunction = (name: string) => (value: string) => {
  const trimmedValue =  value.replace(/\s/g, '')

  const formatPattern = new RegExp(`^${name}\\((?:-?\\d*\\.\\d+,)*-?\\d*\\.\\d+\\)$`)

  const isValidFormat = trimmedValue.match(formatPattern)

  if (!isValidFormat) throw new Error('Invalid Format')

  const matched = trimmedValue.matchAll(/-?\d*\.\d+/g)
  
  return toArray(matched)
}

export default parseFunction