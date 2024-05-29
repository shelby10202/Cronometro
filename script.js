let timerInterval;
let countdownTime = 0;
let isPaused = false;
let remainingTime = 0;

function startTimer() {
    const input = document.getElementById('inputTime').value.split(':');
    countdownTime = (+input[0]) * 60 * 60 + (+input[1]) * 60 + (+input[2]);
    remainingTime = countdownTime;

    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
    isPaused = false;
}

function updateTimer() {
    const hours = String(Math.floor(remainingTime / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((remainingTime % 3600) / 60)).padStart(2, '0');
    const seconds = String(remainingTime % 60).padStart(2, '0');
    document.getElementById('timer').textContent = `${hours}:${minutes}:${seconds}`;

    if (remainingTime > 0) {
        remainingTime--;
    } else {
        clearInterval(timerInterval);
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    isPaused = true;
}

function resumeTimer() {
    if (isPaused) {
        timerInterval = setInterval(updateTimer, 1000);
        isPaused = false;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    document.getElementById('timer').textContent = '00:00:00';
    document.getElementById('inputTime').value = '';
    remainingTime = 0;
    isPaused = false;
}

function updateDateTime() {
    const now = new Date();
    const options = { timeZone: 'America/Sao_Paulo', hour12: false };
    const timeString = now.toLocaleTimeString('pt-BR', options);
    const dateString = now.toLocaleDateString('pt-BR', options);

    document.getElementById('time').textContent = timeString;
    document.getElementById('date').textContent = dateString;
}

function toggleTheme() {
    const body = document.body;
    body.dataset.theme = body.dataset.theme === "dark" ? "light" : "dark";
    const themeToggleBtn = document.getElementById('themeToggle');
    themeToggleBtn.textContent = body.dataset.theme === "dark" ? "🌞" : "🌙";
}

document.body.dataset.theme = "light";
setInterval(updateDateTime, 1000);
updateDateTime();
