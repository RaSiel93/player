import './style/player.css'

// const zoomInput = document.querySelector('.zoom');
const playerTimelineElement = document.querySelector('.player-timeline');
const timeElement = document.querySelector('.time');
let zoom = 0;
let minimumZoom = 0;
let timelineWidth = 0;
let duration = 0;
let userCounter = 0;
let multiplier = 0;


const play = document.querySelector('.play');
const pause = document.querySelector('.pause');
const audio = document.querySelector('audio');
const playerCurrentPosition = document.querySelector('.player--current svg');
const playerCurrentWrapper = document.querySelector('.player--current--wrapper');
const zoomPlus = document.querySelector('.zoom--plus');
const zoomMinus = document.querySelector('.zoom--minus');
const playerWrapper = document.querySelector('.player--wrapper');
let playerInterval = null;


const handleControls = () => {
  play.addEventListener('click', () => {
    audio.play();
    playerInterval = setInterval(() => {
      playerCurrentPosition.style.left = `${audio.currentTime * multiplier}px`;
    }, 100);

    play.style.display = 'none';
    pause.style.display = 'block';
  });
  pause.addEventListener('click', () => {
    audio.pause();

    clearInterval(playerInterval);

    play.style.display = 'block';
    pause.style.display = 'none';
  });
  zoomPlus.addEventListener('click', () => {
    zoom = zoom + 1;
    updateTimeline();
  });
  zoomMinus.addEventListener('click', () => {
    if (zoom > minimumZoom) {
      zoom = zoom - 1;
      updateTimeline();
    }
  });
}

const initPlayer = () => {
  duration = audio.duration;

  // console.log(multiplier);
  handlePlayerCurrentWrapper();
  handleControls();
  updateTimeline();
  // debugger
  // timeElement.style.width = `${duration}px`;
}

const handlePlayerCurrentWrapper = () => {
  playerCurrentWrapper.addEventListener('click', (e) => {
    audio.currentTime = e.offsetX / multiplier;
    playerCurrentPosition.style.left = `${e.offsetX}px`;
  });
}


// const handleZoom = () => zoomInput.addEventListener('change', updateTimeline);

const updateTimeline = () => {
  let previousX = playerCurrentPosition.getBoundingClientRect().x;

  timeElement.style.width = `${(screen.width * 0.8 - 135) * (1.5 ** zoom)}px`;

  timelineWidth = timeElement.clientWidth;
  multiplier = timelineWidth / duration;
  playerCurrentPosition.style.left = `${audio.currentTime * multiplier}px`;

  console.log([playerCurrentPosition.getBoundingClientRect().x, previousX, playerCurrentPosition.getBoundingClientRect().x - previousX])

  playerWrapper.scrollBy(playerCurrentPosition.getBoundingClientRect().x - previousX, 0);

  console.log(playerCurrentPosition.getBoundingClientRect().x - previousX);
}

const updateMarkers = () => {
  const markers = document.querySelectorAll('.marker');

  if (markers) {
    for (let marker of markers) {
      marker.style.left = parseInt(
        marker.getAttribute('data-start')
      ) / duration * 100. + "%";
      marker.style.width = parseInt(
        marker.getAttribute('data-duration')
      ) / duration * 100. + "%";
    }
  }
}

const handleKeypress = () => {
  document.addEventListener('keydown', (e) => {
    if (e.keyCode == 107) {
      zoom = zoom + 1;
      updateTimeline();
    }
    if (e.keyCode == 109 && zoom > minimumZoom) {
      zoom = zoom - 1;
      updateTimeline();
    }
  })
}



const generateStartAndDuration = () => {
  let start = Math.random() * duration;
  let width = Math.random() * duration / 10;

  while (start + width > duration) {
    start = Math.random() * duration;
    width = Math.random() * duration;
  }

  return [start, width];
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

    let [start, width] = generateStartAndDuration();

    marker.setAttribute('data-start', start);
    marker.setAttribute('data-duration', width);

    markers.appendChild(marker);
  }

  user.appendChild(markers);

  playerTimelineElement.appendChild(user);
}



window.onload = () => {
  // if (zoomInput) {
  //   handleZoom();
  // }
  // updateMarkers();
  handleKeypress();

  if (audio) {
    initPlayer();
    for (let step = 0; step < 50; step++) {
      generateUser();
    }
    updateMarkers();
  }
}