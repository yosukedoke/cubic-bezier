import { computed, Ref, reactive, watch } from 'vue'
import functionParser from '../../logic/utils/functionParser'
import mapEasing from '../../logic/utils/mapEasing'
import { CubicBezier } from '../../logic/easing'

const { parse, stringify } = functionParser('cubic-bezier')

export const useEasingArgs = (easing: Ref<string>, onUpdated: (easing: string) => void) => {
  const args = reactive(parse(easing.value).map((v) => Number(v)))

  watch(easing, () => {
    try {
      args.splice(0, args.length, ...parse(easing.value).map((v) => Number(v)))
    } catch(error) {
      // Nothing to do
    }
  })


  watch(args, () => {
    onUpdated(stringify(args))
  })
  
  return args
}

export const useCubicBezier = (args: number[]) => {
  const values = computed(() => {
    const [a, b, c, d] = args
    const calc = mapEasing(0, 1, CubicBezier(a, b, c, d))
    
    return Array.from({ length: 101 }, (_, i) => {
      const t = i / 100
      return calc(t)
    })
  })

  return values
}

