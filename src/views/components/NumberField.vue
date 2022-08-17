<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
   modelValue: {
    type: Number,
    required: true,
   },
  },
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value: number) {
        this.$emit('update:modelValue', value)
      },
    },
  },
})
</script>
<template>
  <input v-model="value" type="number" class="w-full border rounded px-2 py-1 border-gray-400" />
</template>