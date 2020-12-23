import './style/style.css'
import './style/fonts.css'

const container = document.querySelector('.container');
const startInput = document.querySelector('.start');
const percentInput = document.querySelector('.percent');
const month1Input = document.querySelector('.month1');
const month2Input = document.querySelector('.month2');
const month3Input = document.querySelector('.month3');
const button = document.querySelector('.button');
const switcher = document.querySelector('.switcher');
const content = document.querySelector('.content');

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

const handleSwitcher = () => {
  switcher.addEventListener('change', () => { toogleContent() });
}
 
const toogleContainer = () => container.classList.toggle('hide');
const toogleContent = () => content.classList.toggle('active');

const randomColor = () => "#"+((1<<24)*Math.random()|0).toString(16);
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
  if (button) {
    handleButton();
  }
  if (startInput && percentInput) {
    handleInputs();
  }
  handleKeypress();
  if (switcher) {
    handleSwitcher();
  }

  const boxes = document.querySelector('.boxes').children;
 
  for (let box of boxes) { box.style.backgroundColor = randomColor() }
}

