function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');

  form.addEventListener('submit', async event => {
    event.preventDefault();

    const delayInput = form.elements['delay'];
    const stepInput = form.elements['step'];
    const amountInput = form.elements['amount'];

    const initialDelay = parseInt(delayInput.value, 10);
    const step = parseInt(stepInput.value, 10);
    const amount = parseInt(amountInput.value, 10);

    for (let i = 0; i < amount; i++) {
      const currentDelay = initialDelay + i * step;

      try {
        const result = await createPromise(i + 1, currentDelay);
        console.log(
          ` ✅ Fulfilled promise ${result.position} in ${result.delay}ms`
        );
      } catch (error) {
        console.log(
          `❌ Rejected promise ${error.position} in ${error.delay}ms`
        );
      }
    }
  });
});
