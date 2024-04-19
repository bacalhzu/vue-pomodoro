<script setup>
import { computed, reactive } from 'vue';

function zeroFill(value) {
    return ('00'+value).slice(-2);
}

const config = reactive({
    timer: {
        types: [
            'focus',
            'short',
            'long',
        ],
        longBreakInterval: 4,
        duration: {
            focus: {
                maxMinutes: 0,
                maxSeconds: 2 
            },
            short: {
                maxMinutes: 0,
                maxSeconds: 3  
            },
            long: {
                maxMinutes: 0,
                maxSeconds: 4  
            }
        }
    }
})

const timer = reactive({
    active: false, 
    currentType: 'focus',
    currentInterval: 1,
    countdown: {
        minutes: config.timer.duration.focus.maxMinutes, 
        seconds: config.timer.duration.focus.maxSeconds,
        completion: computed(() => {
            const currentType = timer.currentType;
            const configDuration = config.timer.duration[currentType];
            const timerCountdown = timer.countdown;

            const totalSeconds = configDuration.maxMinutes * 60 + configDuration.maxSeconds;
            const remainingSeconds = timerCountdown.minutes * 60 + timerCountdown.seconds;

            return 100.0 - (remainingSeconds / totalSeconds) * 100.0;
        })
    },
});

const message = computed(() => {

    let message = '';

    switch (timer.currentType) {
        case 'focus': 
            message = 'Time to focus!'; 
            break;
        case 'short': 
            message = 'Time for a short break!'; 
            break;
        case 'long': 
            message = 'Time for a long break!'; 
            break;
    }

    return message;
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

function finishTimer() {
    playAudio();        
    stopTimer();

    
    let nextType = timer.currentType;
    if (timer.currentType === 'focus') {
        nextType = 'short';
        if(timer.currentInterval >= 4) {
            timer.currentInterval = 0;
            nextType = 'long';
        }
        timer.currentInterval++;
    }
    else 
        nextType = 'focus'
    
    resetTimer(nextType);
}

function resetTimer(type) {
    timer.active = false;
    timer.currentType = type;
    timer.countdown.minutes = config.timer.duration[timer.currentType].maxMinutes;
    timer.countdown.seconds = config.timer.duration[timer.currentType].maxSeconds;   
}

function executeTimer() {
    // console.log("timer tick");

    if (timer.countdown.seconds > 0)
        timer.countdown.seconds--;

    if (timer.countdown.seconds === 0) {
        if (timer.countdown.minutes === 0) {    
            finishTimer();
            return;
        }
        
        timer.countdown.seconds = 59;
        timer.countdown.minutes--;            
    }
}

function playAudio() {

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

        <div class="timer-message">{{ message }}</div>
        <div class="timer-progress">
            <div class="timer-progress-fill" :style="{width: timer.countdown.completion + '%'}"></div>
        </div>
        <div class="timer-display">
            <div class="timer-display-number dn-minutes">{{ zeroFill(timer.countdown.minutes) }}</div>
            <div class="timer-display-number dn-sep">:</div>
            <div class="timer-display-number dn-seconds">{{ zeroFill(timer.countdown.seconds) }}</div>
        </div>

        <div class="timer-controls">
            <button class="timer-controls-button tcb-toggle" :class="{active: timer.active}" @click="toggleTimer()">
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

    .timer-message {
        font-size: 16pt;
        margin-bottom: 20px;
    }

    .timer-progress {

        margin-bottom: 20px;

        height: 5px;
        width: 100%;

        border-radius: 5px; 

        background-color: var(--primary-dark);
    }

    .timer-progress-fill {
        height: inherit;
        width: 0;

        border-radius: inherit;
        background-color: #f0f0f0;
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