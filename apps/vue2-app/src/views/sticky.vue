<script setup lang="ts">
import { ref } from 'vue'
// import { vSticky } from '@icebreakers/sticky-vue2'
import vSticky from '../sticky'

const stickyEnabled = ref(true)
function onStick(state: any) {
  console.log(state)
}
</script>

<template>
  <div class="app">
    <div class="header">
      <h2>Header</h2>
    </div>
    <div class="sticky-container" sticky-container>
      <div :style="{ background: '#eee', margin: '20px' }">
        <p>
          Text before sticky element. Text before sticky element. Text before sticky element. Text before sticky
          element. Text before sticky element. Text before sticky element. Text before sticky element. Text before
          sticky element. Text before sticky element. Text before sticky element. Text before sticky element. Text
          before sticky element.
        </p>
        <p>
          Text before sticky element. Text before sticky element. Text before sticky element. Text before sticky
          element. Text before sticky element. Text before sticky element. Text before sticky element. Text before
          sticky element. Text before sticky element. Text before sticky element. Text before sticky element. Text
          before sticky element.
        </p>
        <p>
          Text before sticky element. Text before sticky element. Text before sticky element. Text before sticky
          element. Text before sticky element. Text before sticky element. Text before sticky element. Text before
          sticky element. Text before sticky element. Text before sticky element. Text before sticky element. Text
          before sticky element.
        </p>
        <p>
          Text before sticky element. Text before sticky element. Text before sticky element. Text before sticky
          element. Text before sticky element. Text before sticky element. Text before sticky element. Text before
          sticky element. Text before sticky element. Text before sticky element. Text before sticky element. Text
          before sticky element.
        </p>
        <p>
          Text before sticky element. Text before sticky element. Text before sticky element. Text before sticky
          element. Text before sticky element. Text before sticky element. Text before sticky element. Text before
          sticky element. Text before sticky element. Text before sticky element. Text before sticky element. Text
          before sticky element.
        </p>
        <p>
          Text before sticky element. Text before sticky element. Text before sticky element. Text before sticky
          element. Text before sticky element. Text before sticky element. Text before sticky element. Text before
          sticky element. Text before sticky element. Text before sticky element. Text before sticky element. Text
          before sticky element.
        </p>
        <p>
          Text before sticky element. Text before sticky element. Text before sticky element. Text before sticky
          element. Text before sticky element. Text before sticky element. Text before sticky element. Text before
          sticky element. Text before sticky element. Text before sticky element. Text before sticky element. Text
          before sticky element.
        </p>
        <p>
          Text before sticky element. Text before sticky element. Text before sticky element. Text before sticky
          element. Text before sticky element. Text before sticky element. Text before sticky element. Text before
          sticky element. Text before sticky element. Text before sticky element. Text before sticky element. Text
          before sticky element.
        </p>
        <div
          v-sticky="stickyEnabled" class="sticky" sticky-offset="{top: 10, bottom: 30}" sticky-side="both"
          on-stick="onStick" sticky-z-index="20"
        >
          <h2>
            <span>{{ stickyEnabled ? 'Sticky' : 'Not sticky' }}</span>
            <button class="toggle-sticky" @click="stickyEnabled = !stickyEnabled">
              toggle sticky
            </button>
          </h2>
        </div>
        <p>
          Text follow sticky element. Text follow sticky element. Text follow sticky element. Text follow sticky
          element. Text follow sticky element. Text follow sticky element. Text follow sticky element. Text follow
          sticky element. Text follow sticky element. Text follow sticky element. Text follow sticky element. Text
          follow sticky element.
        </p>
        <p>
          Text follow sticky element. Text follow sticky element. Text follow sticky element. Text follow sticky
          element. Text follow sticky element. Text follow sticky element. Text follow sticky element. Text follow
          sticky element. Text follow sticky element. Text follow sticky element. Text follow sticky element. Text
          follow sticky element.
        </p>
        <p>
          Text follow sticky element. Text follow sticky element. Text follow sticky element. Text follow sticky
          element. Text follow sticky element. Text follow sticky element. Text follow sticky element. Text follow
          sticky element. Text follow sticky element. Text follow sticky element. Text follow sticky element. Text
          follow sticky element.
        </p>
        <p>
          Text follow sticky element. Text follow sticky element. Text follow sticky element. Text follow sticky
          element. Text follow sticky element. Text follow sticky element. Text follow sticky element. Text follow
          sticky element. Text follow sticky element. Text follow sticky element. Text follow sticky element. Text
          follow sticky element.
        </p>
        <p>
          Text follow sticky element. Text follow sticky element. Text follow sticky element. Text follow sticky
          element. Text follow sticky element. Text follow sticky element. Text follow sticky element. Text follow
          sticky element. Text follow sticky element. Text follow sticky element. Text follow sticky element. Text
          follow sticky element.
        </p>
        <p>
          Text follow sticky element. Text follow sticky element. Text follow sticky element. Text follow sticky
          element. Text follow sticky element. Text follow sticky element. Text follow sticky element. Text follow
          sticky element. Text follow sticky element. Text follow sticky element. Text follow sticky element. Text
          follow sticky element.
        </p>
        <p>
          Text follow sticky element. Text follow sticky element. Text follow sticky element. Text follow sticky
          element. Text follow sticky element. Text follow sticky element. Text follow sticky element. Text follow
          sticky element. Text follow sticky element. Text follow sticky element. Text follow sticky element. Text
          follow sticky element.
        </p>
        <p>
          Text follow sticky element. Text follow sticky element. Text follow sticky element. Text follow sticky
          element. Text follow sticky element. Text follow sticky element. Text follow sticky element. Text follow
          sticky element. Text follow sticky element. Text follow sticky element. Text follow sticky element. Text
          follow sticky element.
        </p>
      </div>
    </div>
    <div class="footer">
      <h2>Footer</h2>
    </div>
  </div>
</template>

<style scoped>
h2 {
  margin: auto;
  font-size: 40px;
}

.app {
  height: 2000px;
  margin: 0 30px;
}

.header {
  display: flex;
  height: 600px;
  background: #eee;
}

.footer {
  display: flex;
  height: 1200px;
  background: #eee;
}

.sticky-container {
  /* height: 600px; */
  overflow: hidden;
  background: #ccc;
}

.sticky-container p {
  font-size: 20px;
  margin: 20px;
}

.sticky {
  background: #bbb;
  display: flex;
}

.toggle-sticky {
  z-index: 20;
}
</style>
