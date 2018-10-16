// make a grid
const myContainer = document.querySelector('#container');
const scoreBoard = document.getElementById('myScore');

let myScore = 0;

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

createGrid(12);

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




// this needs to keep track of the previous position and remove it

const myPlayerSpot = {
  row: 1,
  column: 8
};


const myCrateSpot = {
  row: 5,
  column: 6
};

class Crate {
  constructor(row, column) {
    this.row = row;
    this.column = column;
  }
}

const crates = [
  new Crate(5, 6),
  new Crate(2, 3),
  new Crate(4, 4)
];


// const myCrateSpot = [{
//   row: 5,
//   column: 6
// },{
//   row: 5,
//   column: 6
// },{
//   row: 5,
//   column: 6
// }];


const myHoleSpot = {
  row: 8,
  column: 8
};


// for tracking the characters and all, make a variable that you use in your dom.
// get the div for the character with the following variables then change the colour to red and give it a class of active for the image.
let currentCharacterPosition = document.querySelector(`div[rowid="${myPlayerSpot.row}"][columnid="${myPlayerSpot.column}"]`);
currentCharacterPosition.classList.add('active');

// get the div for the crate, colour it green and make it a let so you can reassign the let to another div.
let currentCratePosition = document.querySelector(`div[rowid="${myCrateSpot.row}"][columnid="${myCrateSpot.column}"]`);
currentCratePosition.classList.add('crate');

// get the div for the hole and give it class of hole.
const currentHolePosition = document.querySelector(`div[rowid="${myHoleSpot.row}"][columnid="${myHoleSpot.column}"]`);
currentHolePosition.classList.add('hole');



function moveColor() {
  // gets rid of current square class then by reassigning takes new vairable values (from keydown listener) to make a new div with class active.
  // also takes away the crate class after moving to a new square as that class will be left by the crate being moved.
  currentCharacterPosition.classList.remove('active');
  currentCharacterPosition.classList.remove('crate');
  currentCharacterPosition = document.querySelector(`div[rowid="${myPlayerSpot.row}"][columnid="${myPlayerSpot.column}"]`);
  currentCharacterPosition.classList.remove('crate');
  currentCharacterPosition.classList.add('active');
}




// KEYPRESSING FUNCTIONS
window.addEventListener('keydown', function(e) {
  // console.log(e.which);
  if (e.which === 38) {
    e.preventDefault();

    // stops character moving onto crate when crate is at wall and allows code to run otherwise.
    crates.forEach(crate => {
      if (crate.row === 1 && myPlayerSpot.row === 2) {
        console.log('hello');
      }
    });
    if (myCrateSpot.row === 1
      && myPlayerSpot.row === 2
      && myCrateSpot.column === myPlayerSpot.column) {
      console.log('dont move!');
    } else {
      // MOVES UP
      myPlayerSpot.row --;


      //stops character going over the edge - cant be === 0 becuase the ++ will make it row 1.
      if (myPlayerSpot.row === 0) {
        myPlayerSpot.row ++;
      }


      // updates character position and gets rid of current square colour then by reassigning takes new vairable values (from keydown listener) to make a new div colour with red.
      moveColor();


      if (myPlayerSpot.row === myCrateSpot.row
         && myPlayerSpot.column === myCrateSpot.column) {

        // moves in character direction - when character moves onto crate (code above) - moves crate up and makes new square the current square then makes it green.
        myCrateSpot.row --;

        // updates position of crate by reassigning the var with the updated spot row and columns -- don't need to turn this square white as the charater will take over then to white when it leaves.
        currentCratePosition = document.querySelector(`div[rowid="${myCrateSpot.row}"][columnid="${myCrateSpot.column}"]`);
        currentCratePosition.classList.add('crate');
      }
    }

    // if the crate position === the hole position - make the class hole to cover the image just left on it, change the crate vars to 0, 0 by
    // ----- minusing the hol vars then reassign the crate position and colour so it shows up at the top right
    if (myCrateSpot.row === myHoleSpot.row
       && myCrateSpot.column === myHoleSpot.column) {
      currentHolePosition.classList.remove('crate');
      myCrateSpot.row -= (myHoleSpot.row - 2);
      myCrateSpot.column -= (myHoleSpot.column - 2);
      currentCratePosition = document.querySelector(`div[rowid="${myCrateSpot.row}"][columnid="${myCrateSpot.column}"]`);
      currentCratePosition.classList.add('crate');
      updateScore();
    }

    // if the player moves onto the hole, it retracts that movement and uses moveColor() to reassign the spot of the player aswell as
    // ----- changing its colour back. It also returns the colour of the hole to black.
    if (myPlayerSpot.row === myHoleSpot.row
       && myPlayerSpot.column === myHoleSpot.column) {
      myPlayerSpot.row ++;
      moveColor();
      currentHolePosition.classList.remove('active');
    }


  } else if (e.which === 40) {
    e.preventDefault();

    if (myCrateSpot.row === 10
      && myPlayerSpot.row === 9
      && myCrateSpot.column === myPlayerSpot.column) {
      console.log('dont move!');
    } else {

      // MOVES DOWN
      myPlayerSpot.row ++;

      if (myPlayerSpot.row === 11) {
        myPlayerSpot.row --;
      }

      moveColor();

      if (myPlayerSpot.row === myCrateSpot.row
        && myPlayerSpot.column === myCrateSpot.column) {

        myCrateSpot.row ++;

        currentCratePosition = document.querySelector(`div[rowid="${myCrateSpot.row}"][columnid="${myCrateSpot.column}"]`);
        currentCratePosition.classList.add('crate');
      }
    }

    if (myCrateSpot.row === myHoleSpot.row
       && myCrateSpot.column === myHoleSpot.column) {
      currentHolePosition.classList.remove('crate');
      myCrateSpot.row -= (myHoleSpot.row - 2);
      myCrateSpot.column -= (myHoleSpot.column - 2);
      currentCratePosition = document.querySelector(`div[rowid="${myCrateSpot.row}"][columnid="${myCrateSpot.column}"]`);
      currentCratePosition.classList.add('crate');
      updateScore();
    }


    if (myPlayerSpot.row === myHoleSpot.row
       && myPlayerSpot.column === myHoleSpot.column) {
      myPlayerSpot.row --;
      moveColor();
      currentHolePosition.classList.remove('active');
    }


  } else if (e.which === 37) {
    e.preventDefault();

    if (myCrateSpot.column === 1
      && myPlayerSpot.column === 2
      && myCrateSpot.row === myPlayerSpot.row) {
      console.log('dont move!');
    } else {

      // MOVES LEFT
      myPlayerSpot.column --;

      if (myPlayerSpot.column === 0) {
        myPlayerSpot.column ++;
      }

      moveColor();

      if (myPlayerSpot.row === myCrateSpot.row
        && myPlayerSpot.column === myCrateSpot.column) {

        myCrateSpot.column --;

        currentCratePosition = document.querySelector(`div[rowid="${myCrateSpot.row}"][columnid="${myCrateSpot.column}"]`);
        currentCratePosition.classList.add('crate');
      }
    }

    if (myCrateSpot.row === myHoleSpot.row
       && myCrateSpot.column === myHoleSpot.column) {
      currentHolePosition.classList.remove('crate');
      myCrateSpot.row -= (myHoleSpot.row - 2);
      myCrateSpot.column -= (myHoleSpot.column - 2);
      currentCratePosition = document.querySelector(`div[rowid="${myCrateSpot.row}"][columnid="${myCrateSpot.column}"]`);
      currentCratePosition.classList.add('crate');
      updateScore();
    }

    if (myPlayerSpot.row === myHoleSpot.row
       && myPlayerSpot.column === myHoleSpot.column) {
      myPlayerSpot.column ++;
      moveColor();
      currentHolePosition.classList.remove('active');
    }


  } else if (e.which === 39) {
    e.preventDefault();

    if (myCrateSpot.column === 10
      && myPlayerSpot.column === 9
      && myCrateSpot.row === myPlayerSpot.row) {
      console.log('dont move!');
    } else {

      // MOVES RIGHT
      myPlayerSpot.column ++;

      if (myPlayerSpot.column === 11) {
        myPlayerSpot.column --;
      }

      moveColor();

      if (myPlayerSpot.row === myCrateSpot.row
        && myPlayerSpot.column === myCrateSpot.column) {

        myCrateSpot.column ++;

        currentCratePosition = document.querySelector(`div[rowid="${myCrateSpot.row}"][columnid="${myCrateSpot.column}"]`);
        currentCratePosition.classList.add('crate');
      }
    }

    if (myCrateSpot.row === myHoleSpot.row
       && myCrateSpot.column === myHoleSpot.column) {
      currentHolePosition.classList.remove('crate');
      myCrateSpot.row -= (myHoleSpot.row - 2);
      myCrateSpot.column -= (myHoleSpot.column - 2);
      currentCratePosition = document.querySelector(`div[rowid="${myCrateSpot.row}"][columnid="${myCrateSpot.column}"]`);
      currentCratePosition.classList.add('crate');
      updateScore();
    }

    if (myPlayerSpot.row === myHoleSpot.row
       && myPlayerSpot.column === myHoleSpot.column) {
      myPlayerSpot.column --;
      moveColor();
      currentHolePosition.classList.remove('active');
    }

  }
});





// const myCharacter = [{
//   name: 'Josh',
//   x: 3,
//   y: 6
// },{
//   name: 'Josh',
//   x: 3,
//   y: 6
// }];
