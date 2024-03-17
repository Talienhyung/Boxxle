let startTime;
let elapsedTime = 0;
let isRunning = false;

// starting the timer
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    requestAnimationFrame(updateTimer);
  }
}

// stop
function stopTimer() {
  isRunning = false;
}

// Function to update the stopwatch with each frame
function updateTimer() {
  if (isRunning) {
    elapsedTime = Date.now() - startTime;
    displayTime(elapsedTime);
    requestAnimationFrame(updateTimer);
  }
}

// Function for displaying time in HH:MM:SS format
function displayTime(time) {
  const hours = Math.floor(time / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);
  const milliseconds = Math.floor(time % 1000);

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
  
// Display the time
  document.getElementById('timerDisplay').textContent = formattedTime;
}

startTimer();

// Function to restart the stopwatch
export function RestartTimer() {
  stopTimer(); 
  elapsedTime = 0; 
  startTimer();
}
