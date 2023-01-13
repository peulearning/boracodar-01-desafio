const wrapper = document.querySelector(".wrapper");
const title = document.querySelector(".wrapper h1");
const social = document.querySelector(".wrapper .social");

// add a new audio
const audio = new Audio("../assets/music.mp3");

// player buttons
const buttonPlay = document.querySelectorAll(".play");
const buttonPause = document.querySelectorAll(".pause");

// time controls
const fullTime = document.querySelectorAll(".fullTime");
const timeToFinish = document.querySelectorAll(".timeToFinish");
const progressBars = document.querySelectorAll(".progressToFinish");

// time format for the MM:SS
function timeFormat(time) {
  const timeRounded = parseInt(time);

  const timeFraction = timeRounded / 60;

  const minutes = Math.floor(timeFraction).toLocaleString("pt-BR", {
    minimumIntegerDigits: 2,
  });
  const seconds = ((timeFraction - minutes) * 60).toLocaleString("pt-BR", {
    minimumIntegerDigits: 2,
  });

  const fullTime = `${minutes}:${seconds}`;

  return fullTime;
}

// load audio
audio.addEventListener(
  "loadeddata",
  () => {
    fullTime.forEach((time) => {
      time.textContent = timeFormat(audio.duration);
    });
    audio.volume = 0.9;
  },
  false
);

// ended audio actions
audio.addEventListener("ended", () => {
  wrapper.style.animation = "stop";

  new Granim({
    element: "#granim-canvas",
    stateTransitionSpeed: 2000,
    isPausedWhenNotInView: true,
    states: {
      "default-state": {
        gradients: [["#121214", "#271A45"]],
      },
    },
  });

  title.classList.remove("hidden");
  social.classList.add("hidden");
});

// update progressBar
setInterval(() => {
  progressBars.forEach((progressBar) => {
    progressBar.style.width = (audio.currentTime / audio.duration) * 100 + "%";
  });

  timeToFinish.forEach((time) => {
    time.textContent = timeFormat(audio.currentTime);
  });
}, 500);

buttonPlay.forEach((button) => {
  button.addEventListener("click", () => {
    audio.play();

    wrapper.style.animation = "bounce 1s infinite alternate ease";

    title.classList.add("hidden");

    new Granim({
      element: "#granim-canvas",
      stateTransitionSpeed: 2000,
      isPausedWhenNotInView: true,
      states: {
        "default-state": {
          gradients: [
            ["#121214", "#271A45"],
            ["#633BBC", "#121214"],
            ["#271A45", "#121214"],
          ],
        },
      },
    });
  });
});
