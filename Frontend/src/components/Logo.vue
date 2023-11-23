<script setup>
const { size } = defineProps({
  size: {
    required: false,
    type: Number,
    default: 35
  }
})
</script>

<template>
  <span class="logo" :style="{ fontSize: `${size}px` }">
    <router-link to="/" class="logo-content">LINE 97</router-link>
  </span>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Caveat&display=swap');

.logo {
  font-family: 'Caveat', cursive;
  font-weight: 700;

  &-content,
  &-content:hover {
    text-decoration: none;
    color: #000;
    text-shadow: 0 1px #000;
    white-space: nowrap;
  }
}
</style>
