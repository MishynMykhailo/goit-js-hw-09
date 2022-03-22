import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";

const INTERVAL_UPDATE = 1000;
let userSelectDate ;
let intervalID;
const btnStart = document.querySelector('button[data-start]');
const refs = {
  spanDays: document.querySelector('span[data-days]'),
  spanHours: document.querySelector('span[data-hours]'),
  spanMinutes: document.querySelector('span[data-minutes]'),
  spanSeconds: document.querySelector('span[data-seconds]'),
  }

btnStart.setAttribute("disabled","")

btnStart.addEventListener("click",()=>{
intervalID = setInterval(updateTimeInerface,INTERVAL_UPDATE)
})

function updateTimeInerface(){
 const result = userSelectDate - Date.now();
 btnStart.setAttribute("disabled","")
 if (result < 1000) {
   clearInterval(intervalID);
   btnStart.removeAttribute('disabled');
 }
 const resultConvertMs = convertMs(result);
 refs.spanDays.textContent = addLeadingZero(resultConvertMs.days);
 refs.spanHours.textContent = addLeadingZero(resultConvertMs.hours);
 refs.spanMinutes.textContent = addLeadingZero(resultConvertMs.minutes);
 refs.spanSeconds.textContent = addLeadingZero(resultConvertMs.seconds);
 
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      userSelectDate = selectedDates[0].getTime();
      checkUsersDate();
    },
  };

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  };

function addLeadingZero(value) {
  return String(value).padStart(2,'0');
}


function checkUsersDate(){
  if (userSelectDate < new Date().getTime()){
    Notify.failure('Please choose a date in the future',{
      timeout: 1500,
    });
  }else {
    btnStart.removeAttribute('disabled');
  }
} 
flatpickr('input[type="text"]',options);

