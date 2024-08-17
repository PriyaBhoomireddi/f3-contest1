const alarmSound = document.getElementById("alarmSound");
document.getElementById('start-timer').addEventListener('click', () => {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
   

    if (totalSeconds > 0) {
        startNewTimer(totalSeconds);
    }
});

function startNewTimer(totalSeconds) {
    const timerId = Date.now();
    const timerElement = createTimerElement(totalSeconds, timerId);
    document.getElementById('active-timers').appendChild(timerElement);

    const intervalId = setInterval(() => {
        totalSeconds--;
        updateTimerDisplay(timerElement, totalSeconds);

        if (totalSeconds <= 0) {
            clearInterval(intervalId);
            handleTimerEnd(timerElement);
        }
    }, 1000);

    timerElement.querySelector('.delete-timer').addEventListener('click', () => {
        clearInterval(intervalId);
        timerElement.remove();
    });
}

function createTimerElement(totalSeconds, timerId) {
    const timerElement = document.createElement('div');
    timerElement.className = 'timer';
    timerElement.id = `timer-${timerId}`;

    const timeLeft = document.createElement('span');
    timeLeft.className = 'time-left';
    timerElement.appendChild(timeLeft);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-timer';
    deleteButton.innerText = 'Delete';
    timerElement.appendChild(deleteButton);

    updateTimerDisplay(timerElement, totalSeconds);

    return timerElement;
}

function updateTimerDisplay(timerElement, totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    timerElement.querySelector('.time-left').innerText = 
        `Time left : ${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
}

function handleTimerEnd(timerElement) {
    timerElement.className = 'timer finished';
    timerElement.querySelector('.time-left').innerText = 'Timer Is Up!';
    timerElement.querySelector('.delete-timer').innerText = 'Stop';
    playAlarm();
}

function playAlarm() {
    const alarm = new Audio('sounds/c:\Users\admin\Downloads\mixkit-rooster-crowing-in-the-morning-2462.mp3');
    alarmSound.play();

    alarmSound.addEventListener('canplaythrough', () => {
        console.log('Audio can play through!');
    });

    alarmSound.addEventListener('error', (e) => {
        console.error('Failed to load audio', e);
    });
}

