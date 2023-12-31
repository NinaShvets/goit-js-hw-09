import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#datetime-picker');
const btnEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

btnEl.addEventListener('click', onBtnElClick);
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnEl.disabled = true;
    } else {
      btnEl.disabled = false;
    }
  },
};
flatpickr(inputEl, options);

function onBtnElClick() {
  const selectedDate = flatpickr.parseDate(inputEl.value);
  const currentDate = Date.now();
  const timeDifference = selectedDate - currentDate;

  if (timeDifference <= 0) {
    return;
  }

  startTimer(timeDifference);
}

function startTimer(timeDifference) {
  const timerInterval = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    setElementTextContent(daysEl, addLeadingZero(days));
    setElementTextContent(hoursEl, addLeadingZero(hours));
    setElementTextContent(minutesEl, addLeadingZero(minutes));
    setElementTextContent(secondsEl, addLeadingZero(seconds));

    timeDifference -= 1000;

    if (timeDifference <= 0) {
      clearInterval(timerInterval);
      setElementTextContent(daysEl, '00');
      setElementTextContent(hoursEl, '00');
      setElementTextContent(minutesEl, '00');
      setElementTextContent(secondsEl, '00');
    }
  }, 1000);
}

function setElementTextContent(element, text) {
  if (element) {
    element.textContent = text;
  }
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
