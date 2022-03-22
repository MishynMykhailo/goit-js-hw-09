
let intervalChange;
const refs = {
    bodyStyle: document.querySelector('body'),
    startRef:document.querySelector('button[data-start]'),
    stopRef: document.querySelector('button[data-stop]')
}

refs.startRef.addEventListener('click',onBackgroundChange)
refs.stopRef.addEventListener('click',offBackgroundChange)

function onBackgroundChange(){
    refs.startRef.setAttribute('disabled','')
    changeBack
    intervalChange = setInterval(changeBack,1000)
}
function changeBack() {
    refs.bodyStyle.style.backgroundColor = getRandomHexColor()
}
function offBackgroundChange () {
    refs.startRef.removeAttribute("disabled")
    clearInterval(intervalChange)
    console.log(startRef.attributes)
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }