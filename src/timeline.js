import './style/timeline.css'

const zoomInput = document.querySelector('.zoom');
const timelineElement = document.querySelector('.timeline');
let zoom = 10; 
let globalDuration = 1000;
let userCounter = 0;

const handleZoom = () => zoomInput.addEventListener('change', updateTimeline);

const updateTimeline = () => {
  zoom = parseInt(zoomInput.value);
  timelineElement.style.width = parseInt(zoom) * 100 + "px";
}

const updateMarkers = () => {
  const markers = document.querySelectorAll('.marker');
 
  if (markers) {
    for (let marker of markers) { 
      marker.style.left = parseInt(
        marker.getAttribute('data-start')
      ) / 100. * zoom + "%";
      marker.style.width = parseInt(
        marker.getAttribute('data-duration')
      ) / 100. * zoom + "%";
    }
  }
}

const handleKeypress = () => {
  document.addEventListener('keydown', (e) => {
    let value = parseInt(zoomInput.value);

    console.log(e.keyCode);

    if (e.keyCode == 107) {
      zoomInput.value = value + 1;
      updateTimeline();
    }
    if (e.keyCode == 109 && value > 1) {
      zoomInput.value = value - 1;
      updateTimeline();
    }
  })
}

const generateStartAndDuration = () => {
  let start = Math.random() * globalDuration;
  let duration = Math.random() * globalDuration / 10;

  while (start + duration > globalDuration) {
    start = Math.random() * globalDuration;
    duration = Math.random() * globalDuration;
  }

  return [start, duration];
}

const generateUser = () => {
  userCounter += 1;
  const markerCount = Math.random() * 10;

  var user = document.createElement('div');
  var label = document.createElement('div');
  user.classList.add('user');
  label.classList.add('label');
  var userName = document.createTextNode(userCounter);
  user.appendChild(label);
  label.appendChild(userName);
  var markers = document.createElement('div');
  markers.classList.add('markers');

  for (let step = 0; step < markerCount; step++) {
    var marker = document.createElement('div');  
    marker.classList.add('marker');

    let [start, duration] = generateStartAndDuration();

    marker.setAttribute('data-start', start);
    marker.setAttribute('data-duration', duration);

    markers.appendChild(marker);
  }

  user.appendChild(markers);

  timelineElement.appendChild(user);
}

window.onload = () => {
  if (zoomInput) {
    handleZoom();
  }
  updateMarkers();
  handleKeypress();

  for (let step = 0; step < 100; step++) {
    generateUser();
  }

  updateMarkers();
}