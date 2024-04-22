// worker.js
export default function timerWorker() {

    let timerInterval;

    onmessage = (msg) => {
        if (msg.data == 'start')  {
            timerInterval = setInterval(() => postMessage(''), 1000);
        }
        else if (msg.data === 'stop') {
            clearInterval(timerInterval);
        }
    };
};