<template>
    <header class="container py-2">
        <Logo />
    </header>
    <main>
        <router-view />
    </main>
</template>
  
<script setup>
import Logo from '../components/Logo.vue';
</script>

<style lang="scss" scoped></style>
  