class Crate {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    console.log('creating crate at', row, column);
    this.domLocation = document.querySelector(`div[rowid="${row}"][columnid="${column}"]`);
  }

  crateCanMoveTo(row, column) {
    const notAtBorder = row > 0 && row < wallRowsBottom && column > 0 && column < wallColumnsRight;
    const blockingCrates = cratesAtPosition(row, column);
    const noCratesAtPosition = (blockingCrates.length === 0);
    return notAtBorder && noCratesAtPosition;
  }

  moveCrateTo(row, column) {
    if (this.crateCanMoveTo(row, column)) {
      this.undraw();
      this.row = row;
      this.column = column;
      this.draw();
    }
  }

  moveCrateUp() {
    this.moveCrateTo(this.row - 1, this.column);
  }

  moveCrateDown() {
    this.moveCrateTo(this.row + 1, this.column);
  }

  moveCrateLeft() {
    this.moveCrateTo(this.row, this.column - 1);
  }

  moveCrateRight() {
    this.moveCrateTo(this.row, this.column + 1);
  }

  moveCrateBack() {
    this.returnsCrateBack(this.row -5, this.column);
  }


  draw() {
    this.domLocation = document.querySelector(`div[rowid="${this.row}"][columnid="${this.column}"]`);
    this.domLocation.classList.add('crate');
  }

  undraw() {
    this.domLocation = document.querySelector(`div[rowid="${this.row}"][columnid="${this.column}"]`);
    this.domLocation.classList.remove('crate');
  }




  cratesAreOnHole(row, column) {
    const blockingHoles = holesAtPosition(row, column);
    const isOnHole = (blockingHoles.length > 0);
    return isOnHole;
  }

  returnsCrateBack(row, column) {
    if (this.cratesAreOnHole(row, column)) {
      this.undraw();
      this.row = row;
      this.column = column;
      this.draw();
    }
  }


  // returnsCrateToPositionAndScore(row, column) {
  //   if (this.cratesAreOnHole(row, column)) {
  //     console.log('CHANGE PLACES!');
  //     // holes[0].domLocation.classList.remove('crate');
  //     // this.row -= (holes[0].row - 2);
  //     // this.column -= (holes[0].column - 2);
  //     // this.domLocation = document.querySelector(`div[rowid="${this.row}"][columnid="${this.column}"]`);
  //     // this.domLocation.classList.add('crate');
  //     // updateScore();
  //   }
  // }


}

class Player {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    console.log('creating crate at', row, column);
    this.domLocation = document.querySelector(`div[rowid="${row}"][columnid="${column}"]`);
  }

  playerCanMoveTo(row, column) {
    const notAtBorder = row > 0 && row < wallRowsBottom && column > 0 && column < wallColumnsRight;
    const blockingCrates = cratesAtPosition(row, column);
    const noCratesAtPosition = (blockingCrates.length === 0);
    const blockingHoles = holesAtPosition(row, column);
    const noHolesAtPosition = (blockingHoles.length === 0);
    return notAtBorder && noCratesAtPosition && noHolesAtPosition;
  }

  movePlayerTo(row, column) {
    if (this.playerCanMoveTo(row, column)) {
      this.undraw();
      this.row = row;
      this.column = column;
      this.draw();
    }
  }

  pushCrate(row, column, direction) {
    const cratesAt = cratesAtPosition(row, column);
    if (cratesAt.length > 0) {
      const blockingCrate = cratesAt[0];
      switch(direction) {
        case 'up':
          blockingCrate.moveCrateUp();
          break;
        case 'down':
          blockingCrate.moveCrateDown();
          break;
        case 'left':
          blockingCrate.moveCrateLeft();
          break;
        case 'right':
          blockingCrate.moveCrateRight();
          break;
      }
    }
  }

  movePlayerUp() {
    const newRow = this.row - 1;
    const newColumn = this.column;
    this.pushCrate(newRow, newColumn, 'up');
    this.movePlayerTo(newRow, newColumn);
  }

  movePlayerDown() {
    const newRow = this.row + 1;
    const newColumn = this.column;
    this.pushCrate(newRow, newColumn, 'down');
    this.movePlayerTo(newRow, newColumn);
  }

  movePlayerLeft() {
    const newRow = this.row;
    const newColumn = this.column - 1;
    this.pushCrate(newRow, newColumn, 'left');
    this.movePlayerTo(newRow, newColumn);
  }

  movePlayerRight() {
    const newRow = this.row;
    const newColumn = this.column + 1;
    this.pushCrate(newRow, newColumn, 'right');
    this.movePlayerTo(newRow, newColumn);
  }

  draw() {
    this.domLocation = document.querySelector(`div[rowid="${this.row}"][columnid="${this.column}"]`);
    this.domLocation.classList.add('active');
  }

  undraw() {
    this.domLocation = document.querySelector(`div[rowid="${this.row}"][columnid="${this.column}"]`);
    this.domLocation.classList.remove('active');
  }

}

class Hole {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.domLocation = document.querySelector(`div[rowid="${row}"][columnid="${column}"]`);
  }
}

function cratesAtPosition(row, column) {
  return crates.filter(crate => crate.row === row && crate.column === column);
}

function holesAtPosition(row, column) {
  return holes.filter(hole => hole.row === row && hole.column === column);
}

// make a grid
const myContainer = document.querySelector('#container');
const scoreBoard = document.getElementById('myScore');

let myScore = 0;

createGrid(12);

const crates = [
  new Crate(5, 6),
  new Crate(2, 3),
  new Crate(4, 4)
];

const players = [
  new Player(1,8)
];

const holes = [
  new Hole(8, 8)
];


function updateScore() {
  myScore ++;
  scoreBoard.textContent = 'Score: ' + myScore;
}

function createGrid(x) {
  for (let rows = 0; rows < x; rows++) {
    for (let columns = 0; columns < x; columns++) {
      const myGrid = document.createElement('div');
      myGrid.classList.add('grid');
      myGrid.setAttribute('rowid', rows);
      myGrid.setAttribute('columnid', columns);
      myContainer.appendChild(myGrid);
    }
  }
  // myGrid.style.width = 50;
  // myGrid.style.height = 960;
  // $('.grid').height(960/x);
}



const wallRowsTop = 0;
const wallRowsBottom = 11;
const wallColumnsLeft = 0;
const wallColumnsRight = 11;


//select all edge rows and columns
const wallPosition = document.querySelectorAll(`div[rowid="${wallRowsTop}"],[rowid="${wallRowsBottom}"],
[columnid="${wallColumnsLeft}"],[columnid="${wallColumnsRight}"]`);

// use wallPosition to cycle through each edge row and column, adding the wall class to each.
wallPosition.forEach(element => {
  element.classList.add('wall');
});


// for tracking the the hole crates and player - make a variable that you use in your dom.
// get the div for the character with the following variables then change the colour to red and give it a class of active for the image.
players.forEach(player => {
  player.domLocation.classList.add('active');
});

// get the div for the crate, colour it green and make it a let so you can reassign the let to another div.
crates.forEach(crate => {
  crate.domLocation.classList.add('crate');
});

// get the div for the hole and give it class of hole.
holes.forEach(hole => {
  hole.domLocation.classList.add('hole');
});



function handleMovementUp() {
  players[0].movePlayerUp();
  // crates[0].returnsCrateToPositionAndScore();
}

function handleMovementDown() {
  players[0].movePlayerDown();
}

function handleMovementLeft() {
  players[0].movePlayerLeft();
}

function handleMovementRight() {
  players[0].movePlayerRight();
}





function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// KEYPRESSING FUNCTIONS
window.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    handleMovementUp();


    const randomise = getRandomArbitrary(2, 9);

    crates.forEach(crate => {
      if (holes[0].row === crate.row && holes[0].column === crate.column) {
        console.log('Done! -- Not Quite');
        crate.row = randomise;
        crate.column = randomise;
        crate.domLocation = document.querySelector(`div[rowid="${crate.row}"][columnid="${crate.column}"]`);
        crate.domLocation.classList.add('crate');
        updateScore();
        startTimer();
      }
    });

  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    handleMovementDown();

    const randomise = getRandomArbitrary(2, 9);

    crates.forEach(crate => {
      if (holes[0].row === crate.row && holes[0].column === crate.column) {
        console.log('Done! -- Not Quite');
        crate.row = randomise;
        crate.column = randomise;
        crate.domLocation = document.querySelector(`div[rowid="${crate.row}"][columnid="${crate.column}"]`);
        crate.domLocation.classList.add('crate');
        updateScore();
      }
    });

  } else if (e.which === 37) {
    e.preventDefault();
    handleMovementLeft();

    const randomise = getRandomArbitrary(2, 9);

    crates.forEach(crate => {
      if (holes[0].row === crate.row && holes[0].column === crate.column) {
        console.log('Done! -- Not Quite');
        crate.row = randomise;
        crate.column = randomise;
        crate.domLocation = document.querySelector(`div[rowid="${crate.row}"][columnid="${crate.column}"]`);
        crate.domLocation.classList.add('crate');
        updateScore();
      }
    });

  } else if (e.which === 39) {
    e.preventDefault();
    handleMovementRight();

    const randomise = getRandomArbitrary(2, 9);

    crates.forEach(crate => {
      if (holes[0].row === crate.row && holes[0].column === crate.column) {
        console.log('Done! -- Not Quite');
        crate.row = randomise;
        crate.column = randomise;
        crate.domLocation = document.querySelector(`div[rowid="${crate.row}"][columnid="${crate.column}"]`);
        crate.domLocation.classList.add('crate');
        updateScore();
      }
    });

  }
});




// scoreBoard.addEventListener('click', startTimer());








function startTimer() {

  function countDown() {
    let myInterval;
    let myTimer = 20;
    const timer = document.getElementById('timer');
    timer.textContent = myTimer;
    myTimer --;
    if (myTimer === -1) {
      clearInterval(myInterval);
      console.log('Game Over');
    }
  }

  myInterval = setInterval(countDown, 1000);
}




// const startButton = document.getElementById('startMenuButton');
// const startScreen = document.getElementById('#startMenu');
//
// // score var and timing vars
//
// // game start and end screen
// const menu = 1;
// const game = 2;
// let gameState = menu;
//
//
//
// startButton.addEventListener('click', function() {
//   gameState = game;
//   // needs to be in here for if to be read when click occurs
//   if (gameState === game) {
//     startScreen.style.display = 'none';
//   }
// });
