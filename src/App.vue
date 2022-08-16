<script lang="ts">
import { defineComponent } from 'vue'

import CubicBezierEditor from './components/CubicBezierEditor.vue'

export default defineComponent({
  components: {
    CubicBezierEditor,
  },
  data() {
    return {
      easing: 'cubic-bezier(0.19, 0.5, 0.19, 0.5)',
    }
  },
})
</script>
<template>
  <main>
    <div class="vstack">
      <input v-model="easing" type="text" class="input" />
      <CubicBezierEditor :easing="easing" />
    </div>
  </main>
</template>

<style scoped>
.vstack {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding: 10px;
}
.input {
  width: 100%;
}
</style>