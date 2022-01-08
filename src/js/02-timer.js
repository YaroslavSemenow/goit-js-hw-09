import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputDataTime = document.querySelector('input[type = text]');
const startBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

let timeId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentTime = options.defaultDate.getTime();
    const finishTime = selectedDates[0].getTime();

    if (currentTime >= finishTime) {
      Notify.warning('Please choose a date in the future', {
        position: 'center-top',
        width: '400px',
        timeout: 3000,
        closeButton: true,
        backOverlay: true,
        backOverlayColor: 'rgba(0,0,0,0.1)',
        fontSize: '20px',
      });
      return;
    }

    startBtn.removeAttribute('disabled');

    startToCounter(finishTime, currentTime);
  },
};

flatpickr(inputDataTime, options);

function startToCounter(finishTime, currentTime) {
  startBtn.addEventListener('click', onStartBtnClick);

  function onStartBtnClick() {
    startBtn.setAttribute('disabled', '');

    let timeToEnd = finishTime - currentTime;
    timeId = setInterval(() => {
      timeToEnd -= 1000;

      const { days, hours, minutes, seconds } = convertMs(timeToEnd);
      outputCounter(days, hours, minutes, seconds);

      if (timeToEnd < 1000) {
        clearInterval(timeId);
      }
    }, 1000);
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function outputCounter(days, hours, minutes, seconds) {
  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}
