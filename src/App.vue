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

        /* margin: auto; */
        /* max-width: 600px; */

        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .timer {
        z-index: 1;
        background-color: var(--primary);
        padding-top: 20px;
        padding-bottom: 20px;
    }
    footer {
        z-index: 0;
        /* background-color: aliceblue; */
        width: 100%;
        height: 60px;

        position: absolute;

        top: calc(100vh - 60px);

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
