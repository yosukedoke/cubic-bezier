<script lang="ts">
import { defineComponent, toRefs } from 'vue'

export default defineComponent({
  props: {
   easing: {
    type: String,
    required: true,
   },
  },
  setup(props) {
    const { easing } = toRefs(props)

    return {
      easing,
    }
  },
})
</script>
<template>
<section>
{{ easing }}
</section>
</template>