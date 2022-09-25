<template>
  <div>
    <router-link to="/columns">columns</router-link>
    <div class="bg-primary">1234</div>
    <button @click="toggle('light')">light</button><button @click="toggle('dark')">dark</button><button @click="toggle('')">default</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomePage',
  methods: {
    toggle (value: string) {
      document.documentElement.setAttribute('data-color-mode', value)
    }

  }

})

</script>

<style scoped>

</style>
