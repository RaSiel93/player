import './style/style.css'
import './style/fonts.css'

const container = document.querySelector('.container');
const startInput = document.querySelector('.start');
const percentInput = document.querySelector('.percent');
const month1Input = document.querySelector('.month1');
const month2Input = document.querySelector('.month2');
const month3Input = document.querySelector('.month3');
const button = document.querySelector('.button');

var left = 0;

const handleButton = () => {
  button.addEventListener('click', toogleContainer);
}

const handleKeypress = () => {
  document.addEventListener('keypress', (e) => {
    if (e.keyCode == 32) {
      toogleContainer();
    }
  })
}

const handleInputs = () => {
  startInput.addEventListener('change', () => { calculate() });
  percentInput.addEventListener('change', () => { calculate() });
}

const toogleContainer = () => container.classList.toggle('hide');

const calculate = () => {
  if (startInput.checkValidity() && percentInput.checkValidity()) {
    var start = parseFloat(startInput.value);
    var percent = parseFloat(percentInput.value);

    if (start && percent) {
      const month1 = start + start * percent / 100.;
      const month2 = month1 + month1 * percent / 100.;
      const month3 = month2 + month2 * percent / 100.;

      month1Input.textContent = month1;
      month2Input.textContent = month2;
      month3Input.textContent = month3;
    }
  } else {
    month1Input.textContent = '';
    month2Input.textContent = '';
    month3Input.textContent = '';  
  }
}

window.onload = () => {
  handleButton();
  handleInputs();
  handleKeypress();
}