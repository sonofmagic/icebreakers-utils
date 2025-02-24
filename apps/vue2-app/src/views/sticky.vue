<script setup lang="ts">
import { vSticky } from '@icebreakers/sticky-vue2'

function onStick(state: any) {
  console.log(state)
}
</script>

<template>
  <div>
    <div data-sticky-container style="background-color: beige;height: 150vh;">
      <div
        v-sticky="{
          offset: {
            top: 0,
            bottom: 0,
          },
          side: 'top',
          zIndex: 10,
          onStick,
        }" style="background-color: aliceblue;"
      >
        ...
      </div>
    </div>
  </div>
</template>

<style scoped></style>
