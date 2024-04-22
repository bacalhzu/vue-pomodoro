<script setup>
import { computed, reactive } from 'vue';
import timerWorker from './timerWorker.js';

function loadWebWorker(worker) {
    const code = worker.toString();
    const blob = new Blob(['('+code+')()']);
    return new Worker(URL.createObjectURL(blob));
}

function zeroFill(value) {
    return ('00'+value).slice(-2);
}

const config = reactive({
    timer: {
        phases: [
            'focus',
            'short',
            'long',
        ],
        longBreakInterval: 4,
        duration: {
            focus: {
                maxMinutes: 25,
                maxSeconds: 0 
            },
            short: {
                maxMinutes: 5,
                maxSeconds: 0  
            },
            long: {
                maxMinutes: 15,
                maxSeconds: 0  
            }
        }
    }
})

const timer = reactive({
    active: false, 
    currentPhase: 'focus',
    currentInterval: 1,
    countdown: {
        minutes: config.timer.duration.focus.maxMinutes, 
        seconds: config.timer.duration.focus.maxSeconds,
        completion: computed(() => {
            const currentPhase = timer.currentPhase;
            const configDuration = config.timer.duration[currentPhase];
            const timerCountdown = timer.countdown;

            const totalSeconds = configDuration.maxMinutes * 60 + configDuration.maxSeconds;
            const remainingSeconds = timerCountdown.minutes * 60 + timerCountdown.seconds;

            return 100.0 - (remainingSeconds / totalSeconds) * 100.0;
        })
    },
});

const message = computed(() => {

    let message = '';

    switch (timer.currentPhase) {
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

var timerIntervalWorker = loadWebWorker(timerWorker);

function toggleTimer() {
    
    if (timer.active === false)
        startTimer();
    else 
        stopTimer();

    changeTitle();
}

function startTimer() {
    timer.active = true;
    timerIntervalWorker.postMessage('start');
    // console.log("timer started");
    changeTitle();
}

function stopTimer() {
    timer.active = false;
    // console.log("timer stopped");
    timerIntervalWorker.postMessage('stop');
    changeTitle();
}

function finishTimer(skip = false) {
    if (!skip)
        playAudio();        

    stopTimer();

    let nextType = timer.currentPhase;
    if (timer.currentPhase === 'focus') {
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
    timer.currentPhase = type;
    timer.countdown.minutes = config.timer.duration[timer.currentPhase].maxMinutes;
    timer.countdown.seconds = config.timer.duration[timer.currentPhase].maxSeconds;   
}

function playAudio() {

    import('@/assets/audio/finished_777.ogg')
    .then(res => {
        // console.log(res.default);
        let audio = new Audio(res.default);
        audio.play();
    });
}

function changeTitle() {
    if (timer.active) {
        document.title = `${zeroFill(timer.countdown.minutes)}:${zeroFill(timer.countdown.seconds)} - ${message.value}`;
    }
    else
        document.title = 'Minimalist Pomodoro Timer - Simplemodoro';
}

function showSettings() {
    alert("Coming soon!")
}

timerIntervalWorker.onmessage = () => {
    cookie = 'keepActive=true';
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
    changeTitle();
}
</script>

<template>
    <div class="timer">
        <div class="timer-message">
            {{ message }}
        </div>
        <div class="timer-details">
            <div class="timer-progress">
                <div class="timer-progress-fill" :style="{width: timer.countdown.completion + '%'}"></div>                
            </div>
            <img 
                class="settings-button" 
                width="19.5" 
                height="19.5" 
                src="@/assets/icons/gear.svg" 
                alt="settings change icon"
                @click="showSettings()"
            >
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
            <button 
                :style="{marginTop: (timer.active) ? '0px' : '-65px', opacity: (timer.active) ? '1' : '0'}" 
                :disabled="!timer.active"
                class="timer-controls-button tcb-skip"
                @click="finishTimer(skip=true)"
            >
                SKIP
            </button>
        </div>
    </div>

</template>

<style scoped>

    .timer {
        max-width: 400px;
        width: 95%;

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
        margin-bottom: 5px;
    }

    .timer-details {
        display: flex;
        align-items: center;

        width: 100%;

        gap: 10px;
        padding: 0 10px;

        margin-bottom: 10px;

    }
    .timer-progress {

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

        transition: width 0.2s;
    }

    .settings-button {
        cursor: pointer;
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

        transition: background 0.2s ease-in-out, color 0.2s ease-in-out;

        /* box-shadow: var(--primary-shadow) 0px 3px 6px, var(--primary-shadow) 0px 3px 6px; */
    }
    .tcb-toggle {
        z-index: 1;
    }
    .tcb-toggle.active {
        background-color: var(--primary-dark);
        color: white;
    }
    .tcb-skip {
        background-color: var(--secondary-light);

        transition: margin 0.5s, opacity 0.5s;
    }


</style>