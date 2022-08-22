<script lang="ts">
import { defineComponent, toRefs, ref } from 'vue'

import NumberField from './NumberField.vue'
import CurveGraph from './CurveGraph.vue'
import DragableButton from './DragableButton.vue'

import { useEasingArgs, useCubicBezier } from './CubicBezierEditor.hooks'

export default defineComponent({
  components: { NumberField, CurveGraph, DragableButton },
  props: {
    easing: {
      type: String,
      required: true,
    },
  },
  emits: ['update:easing'],
  setup(props, { emit }) {
    const debug = ref(false)
    const { easing } = toRefs(props)

    const onUpdated = (easing: string) => {
      emit('update:easing', easing)
    }

    const args = useEasingArgs(easing, onUpdated)
    const values = useCubicBezier(args)

    const onClick = (easing: string) => {
      emit('update:easing', easing)
    }

    return {
      debug,
      args,
      values,
      onClick,
    }
  },
})
</script>
<template>
  <section class="p-4 border rounded-md bg-white shadow-md">
    <div class="flex flex-col gap-4">
      <div class="relative h-6" style="width: 90%">
        <template v-for="(v, i) in values" :key="v">
          <transition name="fade" appear mode="in-out">
            <div v-if="i % 5 === 0" :style="`transition-delay: ${v * 1}s;`">
              <span
                :style="`left: ${ v * 100}%;`"
                class="inline-block rounded-full absolute bg-purple-300 w-6 h-6 opacity-30" />
            </div>
          </transition>
        </template>
      </div>
      <div class="flex ">
        <div class="flex flex-col gap-2">
          <button class="p-4 bg-gray-200 rounded-sm" @click="onClick('cubic-bezier(0.4, 0, 0.6, 1)')">ease-in-out</button>
          <button class="p-4 bg-gray-200 rounded-sm" @click="onClick('cubic-bezier(0.4, 0, 1, 1)')">ease-in</button>
          <button class="p-4 bg-gray-200 rounded-sm" @click="onClick('cubic-bezier(0, 0, 0.6, 1)')">ease-out</button>
        </div>
        <div class="relative">
          <DragableButton
            :debug="debug"
            :args="args"
            :absolute="true"
            :width="220"
            :height="220"
            style="top: 10px; left: 10px"
          />
          <curve-graph
            v-model:p1x="args[0]"
            v-model:p1y="args[1]"
            v-model:p2x="args[2]"
            v-model:p2y="args[3]"
            :debug="debug"
            :points="values"
            :offset="5"
            :width="240"
            :height="240"
            stroke="#633"
            stroke-width="0.5"
          />
        </div>
      </div>
    </div>
  </section>

  <aside class="p-2 flex flex-col gap-2">
    <div>
      <label>デバッグモード
        <input v-model="debug" type="checkbox" />
      </label>
    </div>
    <h2 class="text-3xl">Props value</h2>
    <p>
      easing:
      <code class="inline-block px-2 py-1 bg-slate-50 rounded-md">{{ easing }}</code>
    </p>

    <h2 class="text-3xl">Arguments</h2>

    <div class="flex gap-2 items-center">
      <label id="p1x">p1.x</label>
      <NumberField
        v-model="args[0]"
        step="0.01"
        min="0.0"
        max="1.0"
        aria-labelledby="p1x"
      />
      <label id="p1y">p1.y</label>
      <NumberField
        v-model="args[1]"
        step="0.01"
        min="0.0"
        max="1.0"
        aria-labelledby="p1y"
      />
      <label id="p2x">p2.x</label>
      <NumberField
        v-model="args[2]"
        step="0.01"
        min="0.0"
        max="1.0"
        aria-labelledby="p2x"
      />
      <label id="p2y">p2.y</label>
      <NumberField
        v-model="args[3]"
        step="0.01"
        min="0.0"
        max="1.0"
        aria-labelledby="p2y"
      />
    </div>

    <h2 class="text-3xl">Generated values</h2>

    <details>
      <summary>値を表示する</summary>
      <p class="mt-2 rounded-md p-4 bg-gray-100 text-xs text-stone-400 leading-6">
        {{ values }}
      </p>
    </details>

  </aside>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>