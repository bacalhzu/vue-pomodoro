<script setup>
import { reactive } from 'vue';

function zeroFill(value) {
    return ('00'+value).slice(-2);
}

const timerValues = reactive({minutes: 1, seconds: 10});

let timer;
function startTimer() {
    console.log("timer started");
    timer = setInterval(executeTimer, 1000);
}

function stopTimer() {
    console.log("timer finished");
    clearInterval(timer);
}

function executeTimer() {
    console.log("timer tick");
    timerValues.seconds--;

    if (timerValues.seconds === 0) {
        if (timerValues.minutes === 0) {
            stopTimer();
            return;
        }
        
        timerValues.seconds = 59;
        timerValues.minutes--;            
    }

    
}

</script>

<template>
    <div class="timer">
        <div class="timer-display">
            <div class="timer-display-number dn-minutes">{{ zeroFill(timerValues.minutes) }}</div>
            <div class="timer-display-number dn-sep">:</div>
            <div class="timer-display-number dn-seconds">{{ zeroFill(timerValues.seconds) }}</div>
        </div>

        <div class="timer-controls">
            <button class="timer-controls-button tcb-toggle" @click="startTimer()">
                START
            </button>
            <!-- <button class="timer-controls-button tcb-toggle" @click="stopTimer()">
                STOP
            </button> -->
            <!-- <button class="timer-controls-button tcb-toggle">
                RESET
            </button> -->
        </div>
    </div>

</template>

<style scoped>

    .timer {
        width: 380px;

        display: flex;
        flex-direction: column;

        align-items: center;
    }

    .timer-display {
        /* background-color: #222; */
        width: 100%;

        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        
        /* padding: 10px 20px; */
    }

    .timer-display-number {
        /* background-color: #222; */
        
        color: #f0f0f0;

        text-align: center;
        
        font-size: 95pt;
        line-height: 155pt;
        height: 200px;

        font-weight: 600;
    }
    .dn-minutes,
    .dn-seconds {
        width: 50%;
        /* padding: 0 25px; */
        background-color: var(--primary-light);
        border-radius: 5px;
    }

    .timer-controls {
        /* background-color: #111; */

        margin-top: 30px;
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }

    .timer-controls-button {
        background-color: #f0f0f0;

        width: 100%;
        padding: 10px;

        font-family: 'Nunito';
        font-weight: 700;
        font-size: 14pt;
        color: var(--primary);

        border: none;
        border-radius: 5px;

        cursor: pointer;
    }
</style>