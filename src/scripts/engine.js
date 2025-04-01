const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    live: document.querySelector("#live"),
  },
  values: {
    hitPosition: 0,
    result: 0,
    curretTime: 60,
    live: 3,
  },
  action: {
    timerID: setInterval(randomSquare, 800),
    countDownTimerID: setInterval(countDown, 1000),
  }
}

function countDown() {
  state.values.curretTime--;
  state.view.timeLeft.textContent = state.values.curretTime;

  if (state.values.curretTime <= 0) {
    clearInterval(state.action.timerID);
    clearInterval(state.action.countDownTimerID);
    alert("GAME OVER! Your final score is " + state.values.result);
  }
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
      }
    });
  });
}

function contagemVidas() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (!(square.classList.contains("enemy"))) {
        state.values.live--;
        state.view.live.textContent = 'x' + state.values.live;
        state.values.hitPosition = null;
        square.classList.remove("enemy");
        if (state.values.live === 0) {
          clearInterval(state.action.timerID);
          clearInterval(state.action.countDownTimerID);
          alert("GAME OVER! Your final score is " + state.values.result);
          state.values.live = 3;
        }
      }
    });
  });
}

function initialize() {
  addListenerHitBox();
  contagemVidas();
};

initialize();
