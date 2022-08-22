<script lang="ts">
import {defineComponent, reactive,  computed, PropType} from 'vue'
import clamp from '../../logic/utils/clamp'

const useHandleButton = () => {
  const state = reactive({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    isPressed: false,
  })

  const mousedown = (e:MouseEvent) => {
    state.isPressed = true

    const { offsetX: x, offsetY: y, target } = e
    const { width, height } = (target as HTMLElement).getBoundingClientRect()

    state.x = x
    state.y = y
    state.width = width
    state.height = height

    document.addEventListener(
      'mouseup',
      () => {
        state.isPressed = false
      },
      { once: true },
    )
  }

  const mouseup = () => {
    state.isPressed = false
  }

  return {
    state,
    mouseup,
    mousedown,
  }
}

const calc  = (
  cursor: { x: number, y: number },
  bounds: { width: number, height: number },
  state: { x: number, y: number, width: number, height: number }) => {
    const newX = cursor.x - state.x + state.width/2
    const newY = cursor.y - state.y + state.height/2

    return [
      clamp(newX, 0, bounds.width) / bounds.width,
      clamp(bounds.height - newY, 0, bounds.height) / bounds.height,
    ]
  }

const useDraggableButton = (
  args: number[],
  bounds: { width: number, height: number },
) => {
  const buttonA = useHandleButton()
  const buttonB = useHandleButton()

  const mousemove = (e: MouseEvent) => {
    const { x, y, currentTarget: div } = e
    const { left, top } = (div as HTMLElement).getBoundingClientRect()
    const cursor = { x: x - left, y: y - top } 

    if (buttonA.state.isPressed) {
      const values = calc(cursor, bounds, buttonA.state)
      
      args.splice(0, 2, ...values)
    }

    if (buttonB.state.isPressed) {
      const values = calc(cursor, bounds, buttonA.state)
      
      args.splice(2, 2, ...values)
    }
  }
    
  const buttonAStyle = computed(() => {
    return `
      left: ${args[0] * bounds.width}px;
      top:  ${(1 - args[1]) * bounds.height}px;
    `
  })
  
  const buttonBStyle = computed(() => {
    return `
      left: ${args[2] * bounds.width}px;
      top:  ${(1 - args[3]) * bounds.height}px;
    `
  })

  return {
    buttonA,
    buttonAStyle,
    buttonB,
    buttonBStyle,
    mousemove,
  }
}

export default defineComponent({
  props: {
    args: {
      type: Object as PropType<number[]>,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    absolute: {
      type: Boolean,
      default: false,
    },
    debug: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const bounds = { width: props.width, height: props.height }
    const {
      buttonA,
      buttonAStyle,
      buttonB,
      buttonBStyle,
      mousemove,
    } = useDraggableButton(props.args, bounds)

    return {
      buttonA,
      buttonAStyle,
      buttonB,
      buttonBStyle,
      mousemove,
    }
  },
})
</script>
<template>
  <div :class="{ absolute : absolute, relative: !absolute }" :style="`width: ${width}px;  height: ${height}px`">
    <div
      :class="['w-full h-full p-4 relative', { border: debug }]"
      @mousemove="mousemove"
    >
      <button
       :class="['w-8 h-8 absolute -translate-x-4 -translate-y-4', { border: debug }]" :style="buttonAStyle"
        @mousedown="buttonA.mousedown"
        @mouseup="buttonA.mouseup"
      ></button>

      <button
        :class="['w-8 h-8 absolute -translate-x-4 -translate-y-4', { border: debug }]" :style="buttonBStyle"
        @mousedown="buttonB.mousedown"
        @mouseup="buttonB.mouseup"
      ></button>

      <div v-if="debug" class="absolute top-2 left-2">
        <div class="text-xs">A{{ args[0] }} / {{ args[1] }}</div>
        <div class="text-xs">B{{ args[2] }} / {{ args[3] }}</div>
      </div>
    </div>
  </div>
</template>