const toArray = <T>(value: IterableIterator<RegExpMatchArray>) => {
  return Array.from(value, m => m[0])
}

const functionParser = (name: string) => {
  const parse = (value: string) => {
    const trimmedValue =  value.replace(/\s/g, '')

    const formatPattern = new RegExp(`^${name}\\((?:-?\\d*\\.?\\d+,)*-?\\d*\\.?\\d+\\)$`)

    const isValidFormat = trimmedValue.match(formatPattern)

    if (!isValidFormat) throw new Error('Invalid Format')

    const matched = trimmedValue.matchAll(/-?\d*\.?\d+/g)
    
    return toArray(matched)
  }

  const stringify = (args: number[]) => {
    return `${name}(${args.join(', ')})`
  }

  return {
    parse,
    stringify,
  }
}

export default functionParser