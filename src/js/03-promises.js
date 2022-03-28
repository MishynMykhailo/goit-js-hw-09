import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs ={
  form: document.querySelector("form.form"),
  submitBtn: document.querySelector("form > button"),
  inputAmount: document.querySelector('[name=amount]')
}

refs.form.addEventListener("submit",(e)=>{
  e.preventDefault();
  runPromisGeneration();
});

function runPromisGeneration () {
  const max_prompt_attempts = Number(refs.form.elements.amount.value);
  const firstDelay = Number(refs.form.elements.delay.value)
  const stepDelay = Number(refs.form.elements.step.value)
  let delay = firstDelay;

  if(stepDelay < 0 || firstDelay < 0 || max_prompt_attempts <= 0){
    Notify.failure('❌ Data entry error',{
      timeout: 2000,
    });
  }else{
    for(let i = 1; i <= max_prompt_attempts;i+=1){
      createPromise(i, delay)
      .then(({position,delay})=>{
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`,{
          timeout: 1500,
        });
      })
      .catch(({position,delay})=>{
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`,{
          timeout: 1500,
        });
      })
        delay+=stepDelay;
    }
  }
}
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      if (shouldResolve) {
        resolve({position,delay})
      } else {
        reject({position,delay})
      }
    },delay)
  })
}

