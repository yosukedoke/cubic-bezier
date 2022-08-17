import clamp from './clamp'

const percent = (duration: number, offset = 0) => {
  return (t: number) => {
    return clamp((t - offset) / duration, 0, 1)
  }
}

export default percent