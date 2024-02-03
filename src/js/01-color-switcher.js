function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

document.addEventListener('DOMContentLoaded', () => {
  let intervalId;

  const startButton = document.getElementById('startButton');
  const stopButton = document.getElementById('stopButton');

  startButton.addEventListener('click', () => {
    // Disable the "Start" button and enable the "Stop" button
    startButton.disabled = true;
    stopButton.disabled = false;

    // Start changing the background color every second
    intervalId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  });

  stopButton.addEventListener('click', () => {
    // Enable the "Start" button and disable the "Stop" button
    startButton.disabled = false;
    stopButton.disabled = true;

    // Stop changing the background color
    clearInterval(intervalId);
  });
});
