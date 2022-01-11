import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', OnFormSubmit);

function OnFormSubmit(e) {
  e.preventDefault();

  const formElements = e.target.elements;
  const step = Number(formElements.step.value);
  const amount = Number(formElements.amount.value);

  let delay = Number(formElements.delay.value);

  for (let position = 1; position <= amount; position++) {
    createPromise(position, delay).then(onCreatePromiseSuccess).catch(onCreatePromiseErroe);
    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setInterval(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }

      reject({ position, delay });
    }, delay);
  });
}

function onCreatePromiseSuccess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
    timeout: 3000,
  });
}

function onCreatePromiseErroe({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
    timeout: 3000,
  });
}
