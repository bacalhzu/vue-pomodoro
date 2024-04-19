<script setup>
import { reactive } from 'vue';

function zeroFill(value) {
    return ('00'+value).slice(-2);
}

const timer = reactive({
    active: false, 
    countdown: {
        minutes: 0, 
        seconds: 10
    },
});

let timerInterval;
function toggleTimer() {
    
    if (timer.active === false)
        startTimer();
    else 
        stopTimer();
    
    timer.active = !timer.active;
}

function startTimer() {
    // console.log("timer started");
    timerInterval = setInterval(executeTimer, 1000);
}

function stopTimer() {
    // console.log("timer stopped");
    clearInterval(timerInterval);
}

function executeTimer() {
    // console.log("timer tick");
    timer.countdown.seconds--;

    if (timer.countdown.seconds === 0) {
        if (timer.countdown.minutes === 0) {    
            playAudio();        
            stopTimer();
            return;
        }
        
        timer.countdown.seconds = 59;
        timer.countdown.minutes--;            
    }
}

async function playAudio() {

    import('@/assets/audio/finished_777.ogg')
    .then(res => {
        // console.log(res.default);
        let audio = new Audio(res.default);
        audio.play();
    });
}

</script>

<template>
    <div class="timer">
        <div class="timer-display">
            <div class="timer-display-number dn-minutes">{{ zeroFill(timer.countdown.minutes) }}</div>
            <div class="timer-display-number dn-sep">:</div>
            <div class="timer-display-number dn-seconds">{{ zeroFill(timer.countdown.seconds) }}</div>
        </div>

        <div class="timer-controls">
            <button class="timer-controls-button tcb-toggle" :class="timer.active ? 'active' : ''" @click="toggleTimer()">
                {{ timer.active ? 'PAUSE' : 'START' }}
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

        box-shadow: var(--primary-shadow) 0 1.95px 2.6px;

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

        box-shadow: var(--primary-shadow) 0 1.95px 2.6px;

        /* box-shadow: var(--primary-shadow) 0px 3px 6px, var(--primary-shadow) 0px 3px 6px; */
    }
    .tcb-toggle.active {
        background-color: var(--primary-dark);
        color: white;
    }


</style>