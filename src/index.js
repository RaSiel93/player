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
  button.addEventListener('click', () => {
      container.classList.toggle('hide');
    }
  );
}

const move = () => {
  setInterval(performMove, 5);   
};

const performMove = () => {
  if (left > -2300) {
    container.style.left = `${left - 1}px`
    left -= 10; 
  }
};

const calculate = () => {
  var start = parseInt(startInput.value);
  var percent = parseInt(percentInput.value);

  if (start && percent) {
    month1 = start + start * percent / 100.;
    month2 = month1 + month1 * percent / 100.;
    month3 = month2 + month2 * percent / 100.;

    month1Input.textContent = month1;
    month2Input.textContent = month2;
    month3Input.textContent = month3;
  }
}

window.onload = () => {
  handleButton();
}