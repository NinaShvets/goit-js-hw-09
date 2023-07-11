const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
let intervalId;
btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStopClick);

function onBtnStartClick() {
  btnStart.disabled = true;
  btnStop.disabled = false;
  intervalId = setInterval(changeBackgroundColor, 1000);
}
function onBtnStopClick() {
  clearInterval(intervalId);
  btnStart.disabled = false;
  btnStop.disabled = true;
}
function changeBackgroundColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}
