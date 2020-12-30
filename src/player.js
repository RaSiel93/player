import './style/player.css'

// const zoomInput = document.querySelector('.zoom');
const playerTimelineElement = document.querySelector('.player-timeline');
const timeElement = document.querySelector('.player--time');
let zoom = 0;
let minimumZoom = 0;
let maximumZoom = 9;
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

const timelineCanvas = document.querySelector('.player--time canvas');

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
    if (zoom < maximumZoom) {
      zoom = zoom + 1;
    }
    updateTimeline();
  });
  zoomMinus.addEventListener('click', () => {
    if (zoom > minimumZoom) {
      zoom = zoom - 1;
      updateTimeline();
    }
  });
}

const handlePlayerCurrentWrapper = () => {
  playerCurrentWrapper.addEventListener('click', (e) => {
    audio.currentTime = e.offsetX / multiplier;
    playerCurrentPosition.style.left = `${e.offsetX}px`;
  });
}

const handleKeypress = () => {
  document.addEventListener('keydown', (e) => {
    if (e.keyCode == 107 && zoom < maximumZoom) {
      zoom = zoom + 1;
      updateTimeline();
    }
    if (e.keyCode == 109 && zoom > minimumZoom) {
      zoom = zoom - 1;
      updateTimeline();
    }
  })
}

const initPlayer = () => {
  duration = audio.duration;
  // duration = 1400;
  // duration = 100000;

  handlePlayerCurrentWrapper();
  handleControls();
  updateTimeline();
}

const updateTimeline = () => {
  let previousX = playerCurrentPosition.getBoundingClientRect().x;

  timeElement.style.width = `${(screen.width * 0.8 - 135) * (1.5 ** zoom)}px`;

  timelineWidth = timeElement.clientWidth;
  multiplier = timelineWidth / duration;
  drawTimeline();

  playerCurrentPosition.style.left = `${audio.currentTime * multiplier}px`;
  playerWrapper.scrollBy(playerCurrentPosition.getBoundingClientRect().x - previousX, 0);
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

const drawTimeline = () => {
  let ctx = timelineCanvas.getContext('2d');
  ctx.canvas.width = timelineWidth;

  let index = Math.ceil(-Math.log10(timelineWidth / duration) + 2);

  const levels = ['1s', '5s', '15s', '1min', '5min', '15min', '1h'];

  // width = 1401
  // 0.01401 100000 6 > 0.01
  // 0.1401 10000 4, 5 > 0.1
  // 1.401 1000 3 > 1
  // 0.01401 500 2
  // 14.01 100 1 > 10

  // console.log(timelineWidth / duration)
  // console.log(timelineWidth)


  let level = levels[index];
  console.log(timelineWidth / duration)
  console.log(index)

  if (level == '1s') {
    for (let step = 0; step < duration; step++) {
      ctx.font = "16px Arial";
      ctx.fillText(`${step}s`, step * multiplier - 4, 16);
      ctx.moveTo(step * multiplier, 20);
      ctx.lineTo(step * multiplier, 40);
      ctx.stroke();
    }
  }

  if (level == '5s') {
    for (let step = 0; step < duration / 5; step++) {
      ctx.font = "16px Arial";
      ctx.fillText(`${step * 5}s`, step * multiplier * 5 - 4, 16);
      ctx.moveTo(step * multiplier * 5, 20);
      ctx.lineTo(step * multiplier * 5, 40);
      ctx.stroke();
    }
  }

  if (level == '15s') {
    for (let step = 0; step < duration / 15; step++) {
      ctx.font = "16px Arial";
      ctx.fillText(`${step * 15}s`, step * multiplier * 15 - 4, 16);
      ctx.moveTo(step * multiplier * 15, 20);
      ctx.lineTo(step * multiplier * 15, 40);
      ctx.stroke();
    }
  }

  if (level == '1min') {
    for (let step = 0; step < duration / 60; step++) {
      ctx.font = "16px Arial";
      ctx.fillText(`${step}min`, step * multiplier * 60 - 4, 16);
      ctx.moveTo(step * multiplier * 60, 20);
      ctx.lineTo(step * multiplier * 60, 40);
      ctx.stroke();
    }
  }

  if (level == '5min') {
    for (let step = 0; step < duration / 60 / 5; step++) {
      ctx.font = "16px Arial";
      ctx.fillText(`${step * 5}min`, step * multiplier * 60 * 5 - 4, 16);
      ctx.moveTo(step * multiplier * 60 * 5, 20);
      ctx.lineTo(step * multiplier * 60 * 5, 40);
      ctx.stroke();
    }
  }

  if (level == '15min') {
    for (let step = 0; step < duration / 60 / 15; step++) {
      ctx.font = "16px Arial";
      ctx.fillText(`${step * 15}min`, step * multiplier * 60 * 15 - 4, 16);
      ctx.moveTo(step * multiplier * 60 * 15, 20);
      ctx.lineTo(step * multiplier * 60 * 15, 40);
      ctx.stroke();
    }
  }

  if (level == '1h') {
    for (let step = 0; step < duration / 60 / 60; step++) {
      ctx.font = "16px Arial";
      ctx.fillText(`${step}h`, step * multiplier * 60 * 60 - 4, 16);
      ctx.moveTo(step * multiplier * 60 * 60, 20);
      ctx.lineTo(step * multiplier * 60 * 60, 40);
      ctx.stroke();
    }
  }
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
  handleKeypress();

  if (audio) {
    initPlayer();
    for (let step = 0; step < 50; step++) {
      generateUser();
    }
    updateMarkers();
  }
}