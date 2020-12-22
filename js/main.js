var sheet = document.getElementById('sheet');
var left = 0;

function moveLeft() {
  setInterval(function() {
    if (left > -2300) {
      sheet.style.left = `${left - 1}px`
      left -= 10; 
    }
  }, 5);   
};

var startInput = document.getElementById('start');
var percentInput = document.getElementById('percent');
var month1Input = document.getElementById('month1');
var month2Input = document.getElementById('month2');
var month3Input = document.getElementById('month3');

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