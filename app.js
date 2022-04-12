const box = document.querySelector('.box');
const h1Maker = document.querySelector('h1');
const gameBoard = document.querySelector('.game');
const dim = gameBoard.getBoundingClientRect();
const totalScoreText = document.querySelector('.totalScore');
const timerText = document.querySelector('.timer');

const game = {
    size: 40,
    x: 50,
    y: 50,
    speed: 1,
    counter: 0,
    max: 10
};

const enemies = [];

let totalScore = 0;
let timeLeft = 10;
const restartButton = document.getElementsByClassName("restart-button")[0];
const bestScore = document.getElementsByClassName("bestScore")[0];

let x = setInterval(function() {
    timeLeft--;
    timerText.textContent = 'Time Left: ' + timeLeft;  
    // If the count down is finished, write some text
    if (timeLeft < 0) {
      clearInterval(x);
      timerText.textContent = 'Time Up!'
      if (localStorage.length === 0) {
          localStorage.setItem("bestScore", totalScore);
      } else {
          if (totalScore > localStorage.getItem("bestScore")) {
              localStorage.setItem("bestScore", totalScore);
          }
      }
      bestScore.textContent = "Best Score: " + localStorage.getItem("bestScore");
      if (restartButton.classList.contains('d-none')) {
        restartButton.classList.remove('d-none');
        restartButton.classList.add('d-block');
      }
    }
  }, 1000);


const keyz = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false
};

const btnClick = () => {
    window.location.reload();
}


box.style.position = 'absolute';
box.style.border = '1px solid black';
box.style.display = 'none';
box.style.width = game.size + 'px';
box.style.height = game.size + 'px';

box.style.top = game.y + 'px';
box.style.left = game.x + 'px';

box.style.backgroundColor = 'red';

const updatePos = () => {
    if (keyz.ArrowLeft) {
        game.x -= game.speed;
    } else if (keyz.ArrowRight) {
        game.x += game.speed;
    } else if (keyz.ArrowDown) {
        game.y += game.speed;
    } else if (keyz.ArrowUp) {
        game.y -= game.speed;
    }
    box.style.left = game.x + 'px';
    box.style.top = game.y + 'px';
    // Create enemies
    if (ranNum(0, 11) === 10 && game.max >= enemies.length) {
        const newElement = maker('div');
    }
    // Move enemies
    enemies.forEach(enemy => {
        let x = enemy.offsetLeft;
        let y = enemy.offsetTop;
        if (x > dim.right - 45 || x < dim.left) {
            enemy.dirX *= -1;
        }
        if (y > dim.bottom - 45 || y < dim.top) {
            enemy.dirY *= -1;
        }
        y += enemy.dirY;
        x += enemy.dirX;
        if (timeLeft < 0) {
            enemy.dirX = 0;
            enemy.dirY = 0;
        }
        enemy.style.left = x + 'px';
        enemy.style.top = y + 'px';
    });
    move = window.requestAnimationFrame(updatePos, 1);
}

let move = window.requestAnimationFrame(updatePos, 1);

const maker = (elementType) => {
    game.counter++;
    const element = document.createElement('div');
    /* element.textContent = game.counter; */
    element.classList.add('enemy');
    element.style.left = ranNum(dim.left, dim.right - game.size) + 'px';
    element.style.top = ranNum(dim.top + 30, dim.bottom - game.size) + 'px';
    enemies.push(element);
    element.style.backgroundColor = 'rgb('+ranNum(1, 255)+','+ranNum(1, 255)+','+ranNum(1, 255)+')';
    element.dirX = ranNum(1, 7);
    element.dirY = ranNum(1, 7);
    element.addEventListener('click', (e) => {
        element.dirX += ranNum(1, 7);
        element.dirY += ranNum(1, 7);
        if (timeLeft >= 0) {totalScore += Math.abs(element.dirX > element.dirY ? element.dirX : element.dirY);}
        totalScoreText.textContent = 'Total Score: ' + totalScore;
    });
    return gameBoard.appendChild(element);
};

const ranNum = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

