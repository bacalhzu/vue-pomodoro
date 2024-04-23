<script setup>
// import { SpeedInsights } from "@vercel/speed-insights/vue";
import Timer from './components/Timer/Timer.vue';
</script>

<template>
    <main>
        <!-- <SpeedInsights /> -->
        <header>        
            <a class="logo" href="."><h1>Simplemodoro</h1></a>
        </header>
        <Timer />
        <footer>
            <span class="madeby">Made by Davi Bacalhau ♥</span>     
            <a class="madeby-link" href="http://littlesekii.com" target="_blank">littlesekii.com</a>
        </footer>
    </main>
    
  
</template>

<style scoped>

    header {
        width: 95%;
        height: 80px;

        display: flex;
        justify-content: center;
        align-items: center;
        /* background-color: aqua; */

        /* border-bottom: 2px solid var(--primary-dark); */
        /* border-bottom: 2px solid white; */
        margin-bottom: 40px;
    }

    header a h1 {
        font-size: 18pt;
    }

    .logo {
        color: #FFF;
        text-decoration: none;
        border-bottom: 2px solid var(--primary-light);

        padding: 10px 50px;
        font-size: 16pt;
    }
    main {        
        /* background-color: #000; */

        height: 100vh;

        margin: auto;
        max-width: 600px;

        display: flex;
        flex-direction: column;
        align-items: center;
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
</style>./components/Timer/Timer.vue
