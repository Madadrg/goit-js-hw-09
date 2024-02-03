import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

document.addEventListener('DOMContentLoaded', function () {
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minutesIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];

      if (selectedDate <= new Date()) {
        // Date in the past
        window.alert('Please choose a date in the future');
        document.querySelector('[data-start]').disabled = true;
      } else {
        // Valid future date
        document.querySelector('[data-start]').disabled = false;
      }
    },
  };

  flatpickr('#datetime-picker', options);

  document.querySelector('[data-start]').addEventListener('click', function () {
    const endDate = flatpickr.parseDate(
      document.querySelector('#datetime-picker').value
    );

    if (endDate) {
      startCountdownTimer(endDate);
      // Disable the button to prevent starting the timer again
      this.disabled = true;
    } else {
      window.alert('Please select a valid future date');
    }
  });

  function startCountdownTimer(endDate) {
    const timerFields = {
      days: document.querySelector('[data-days]'),
      hours: document.querySelector('[data-hours]'),
      minutes: document.querySelector('[data-minutes]'),
      seconds: document.querySelector('[data-seconds]'),
    };

    function updateTimer() {
      const now = new Date();
      const timeDifference = endDate - now;

      if (timeDifference <= 0) {
        // Timer expired, reload the page to select a new date
        clearInterval(timerInterval);
        location.reload();
        return;
      }

      const { days, hours, minutes, seconds } = convertMs(timeDifference);

      timerFields.days.textContent = addLeadingZero(days);
      timerFields.hours.textContent = addLeadingZero(hours);
      timerFields.minutes.textContent = addLeadingZero(minutes);
      timerFields.seconds.textContent = addLeadingZero(seconds);
    }

    function convertMs(ms) {
      const second = 1000;
      const minute = 60 * second;
      const hour = 60 * minute;
      const day = 24 * hour;

      const days = Math.floor(ms / day);
      const hours = Math.floor((ms % day) / hour);
      const minutes = Math.floor((ms % hour) / minute);
      const seconds = Math.floor((ms % minute) / second);

      return { days, hours, minutes, seconds };
    }

    function addLeadingZero(value) {
      // Use padStart to add leading zero if necessary
      return value.toString().padStart(2, '0');
    }

    // Initial call to update timer immediately
    updateTimer();

    // Update timer every second
    const timerInterval = setInterval(updateTimer, 1000);
  }
});
