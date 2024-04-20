<script setup>
import Timer from './components/Timer.vue';
</script>

<template>
  <main>
    <Timer class="timer"/>
    <footer>
        <span class="madeby">Made by Davi Bacalhau ♥</span>     
        <a class="madeby-link" href="http://littlesekii.com" target="_blank">littlesekii.com</a>
    </footer>
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
        /* justify-content: center; */
        align-items: center;
    }
    .timer {
        /* background-color: aqua; */
        margin: auto;
    }
    footer {

        /* background-color: aliceblue; */
        width: 100%;
        height: 60px;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    .madeby {
        font-size: 14pt;
    }
    .madeby-link {
        /* text-decoration: none; */
        color: inherit;
    }
</style>
