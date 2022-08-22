<script lang="ts">
import { computed  } from 'vue'
import { defineComponent } from 'vue'

const CurveGraph = defineComponent({
  props: {
    debug: {
      type: Boolean,
      default: false,
    },
    offset: {
      type: Number,
      default: 0,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    points: {
      type: Array<number>,
      required: true,
    },
    p1x: {
      type: Number,
      required: true,
    },
    p1y: {
      type: Number,
      required: true,
    },
    p2x: {
      type: Number,
      required: true,
    },
    p2y: {
      type: Number,
      required: true,
    },
  },
  emits: ['update:p1x', 'update:p1y', 'update:p2x', 'update:p2y'],
  setup(props) {
    const viewBox = computed(()=> {
      const wh = 100 + props.offset * 2

      return `0 0 ${wh} ${wh}`
    })

    const plotCanvas = (x: number, y: number) => {
      return { 
        x: x * 100 + props.offset,
        y: (1 - y) * 100 + props.offset,
      }
    }

    const points = computed(() => {
      return props.points.map((y, x) => {
        const p = plotCanvas(x/100, y)
        return `${p.x}, ${p.y}`
      }).join(' ')
    })

    const startPoint = computed(() => plotCanvas(0, props.points[0]))
    const endPoint = computed(() => plotCanvas(1, props.points[props.points.length - 1]))

    const startHandle = computed(() => plotCanvas(props.p1x, props.p1y))
    const endHandle = computed(() => plotCanvas(props.p2x, props.p2y))

    return {
      startPoint,
      endPoint,
      points,
      viewBox,
      startHandle,
      endHandle,
    }
  },
})

export default CurveGraph
</script>
<template>
  <svg xmlns="http://www.w3.org/2000/svg" :viewBox="viewBox" :width="width" :height="height">
      <rect v-if="debug" :x="offset" :y="offset" :width="100" :height="100" stroke-width="0.2" stroke="red" fill="transparent" />
      <polyline
        :points="points"
        fill="transparent"/>
      <!-- Handles -->
      <line :x1="startPoint.x" :y1="startPoint.y" :x2="startHandle.x" :y2="startHandle.y" />
      <line :x1="endPoint.x" :y1="endPoint.y" :x2="endHandle.x" :y2="endHandle.y" />
      <rect
        :x="startHandle.x - 5" :y="startHandle.y - 5"
        width="10.9" height="10.9"
        fill="#99F" label="Handle to control p1 point"
        />
      <rect
        :x="endHandle.x - 5" :y="endHandle.y - 5"
        width="10.90" height="10.9"
        fill="#99F" label="Handle to control p2 point"
      />

      <ellipse :cx="startPoint.x" :cy="startPoint.y" rx="2" ry="2" fill="white" />
      <ellipse :cx="endPoint.x" :cy="endPoint.y" rx="2" ry="2" fill="white" />
    </svg>
</template>