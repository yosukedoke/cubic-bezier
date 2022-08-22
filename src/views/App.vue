<script lang="ts">
import { defineComponent } from 'vue'

import TextField from './components/TextField.vue'
import CubicBezierEditor from './components/CubicBezierEditor.vue'

export default defineComponent({
  components: {
    CubicBezierEditor,
    TextField,
  },
  data() {
    return {
      easing: 'cubic-bezier(0.19, 0.5, 0.5, 0.75)',
    }
  },
})
</script>
<template>
  <main>
    <div class="vstack p-4">
      <TextField v-model="easing" />
      <CubicBezierEditor v-model:easing="easing" />
    </div>
  </main>
</template>

<style scoped>
.vstack {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}
</style>