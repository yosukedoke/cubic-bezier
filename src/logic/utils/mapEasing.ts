
import { EasingFunction } from '../easing'

const mapEasing = (from: number, to: number, easing: EasingFunction) => {
  const from_ = Math.min(from, to) 
  const to_ = Math.max(from, to)
  const range = to_ - from_

  return (t: number) => {
    return from_ + range * easing(t)
  }
}

export default mapEasing