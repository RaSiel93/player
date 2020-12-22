var container = document.getElementsByClassName('container')[0];
var startInput = document.getElementsByClassName('start')[0];
var percentInput = document.getElementsByClassName('percent')[0];
var month1Input = document.getElementsByClassName('month1')[0];
var month2Input = document.getElementsByClassName('month2')[0];
var month3Input = document.getElementsByClassName('month3')[0];
var left = 0;

function move() {
  setInterval(performMove, 5);   
};

function performMove() {
  if (left > -2300) {
    container.style.left = `${left - 1}px`
    left -= 10; 
  }
};

function calculate() {
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