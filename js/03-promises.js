import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const delayInputEl = document.querySelector('input[name="delay"]');
const stepInputEl = document.querySelector('input[name="step"]');
const amountInputEl = document.querySelector('input[name="amount"]');

formEl.addEventListener('submit', onFormElSubmit);

function onFormElSubmit(event) {
  event.preventDefault();

  const delay = Number(delayInputEl.value);
  const step = Number(stepInputEl.value);
  const amount = Number(amountInputEl.value);

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay);
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  promise
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
