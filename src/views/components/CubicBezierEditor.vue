<script lang="ts">
import { computed, defineComponent, ref, unref, watchEffect } from 'vue'
import parseFunction from '../../logic/utils/parseFunction'
import mapEasing from '../../logic/utils/mapEasing'
import { Linear, CubicBezier } from '../../logic/easing'

import NumberField from './NumberField.vue'
import CurveGraph from './CurveGraph.vue'

const parse = parseFunction('cubic-bezier')

const useCubicBezier = (easing: string) => {
  const args = ref([0, 0, 1, 1])

  watchEffect(() => {
    try {
      args.value = parse(easing).map((v) => Number(v))
    } catch(error) {
      // Nothing to do
    }
  })
  
  const calc = computed(() => {
    const [a, b, c, d] = unref(args)
    return mapEasing(0, 1, CubicBezier(a, b, c, d))
  })

  const values = computed(() => {
    return Array.from({ length: 101 }, (_, i) => {
      const t = i / 100
      return calc.value(t)
    })
  })

  return {
    args,
    values,
  }
}

export default defineComponent({
  components: { NumberField, CurveGraph },
  props: {
    easing: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { args, values } = useCubicBezier(props.easing)

    return {
      args,
      values,
    }
  },
})
</script>
<template>
  <section class="p-4 border rounded-md bg-white shadow-md">
    <div class="flex flex-col gap-4">
      <h2 class="text-3xl">Props value</h2>
      <p>easing: <code class="inline-block px-2 py-1 bg-slate-50 rounded-md">{{ easing }}</code></p>

      <h2 class="text-3xl">Arguments</h2>

      <div class="flex gap-2 items-center">
        <label id="p1x">p1.x</label>
        <NumberField v-model="args[0]" step="0.01" min="0.0" max="1.0" aria-labelledby="p1x" />
        <label id="p1y">p1.y</label>
        <NumberField v-model="args[1]" step="0.01" min="0.0" max="1.0" aria-labelledby="p1y" />
        <label id="p2x">p2.x</label>
        <NumberField v-model="args[2]" step="0.01" min="0.0" max="1.0" aria-labelledby="p2x"/>
        <label id="p2y">p2.y</label>
        <NumberField v-model="args[3]" step="0.01" min="0.0" max="1.0" aria-labelledby="p2y" />
      </div>

      <h2 class="text-3xl">Generated values</h2>
    
      <details>
        <summary>値を表示する</summary>
        <p class="mt-2 rounded-md p-4 bg-gray-100 text-xs text-stone-400 leading-6">
          {{ values }}
        </p>
      </details>
      
      <h2 class="text-3xl">Render graph</h2>

      <div class="relative">
        <curve-graph
          v-model:p1x="args[0]"
          v-model:p1y="args[1]"
          v-model:p2x="args[2]"
          v-model:p2y="args[3]"
          :points="values"
          :offset="10"
          width="300" height="300"
          stroke="#633" stroke-width="0.5"/>
      </div>
    </div>
  </section>
</template>