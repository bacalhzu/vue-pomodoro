<script setup>
import Timer from './components/Timer.vue';
</script>

<template>
  <main>
    <Timer />
  </main>
</template>

<style scoped>
    main {        
        /* background-color: #000; */

        height: 100vh;

        margin: auto;
        max-width: 600px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        margin-top: -80px;
    }
</style>
