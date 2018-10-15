// make a grid
const myContainer = document.querySelector('#container');






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

createGrid(10);

// this needs to keep track of the previous position and remove it

const myPlayerSpot = {
  row: 0,
  column: 8
};


const myCrateSpot = {
  row: 5,
  column: 6
};


// for tracking the characters and all, make a variable that you use in your dom
let currentCharacterPosition = document.querySelector(`div[rowid="${myPlayerSpot.row}"][columnid="${myPlayerSpot.column}"]`);
// currentCharacterPosition.classList.add('active');
console.log(currentCharacterPosition);
currentCharacterPosition.style.backgroundColor = 'red';

let currentCratePosition = document.querySelector(`div[rowid="${myCrateSpot.row}"][columnid="${myCrateSpot.column}"]`);
currentCratePosition.style.backgroundColor = 'green';




function moveColor() {
  // gets rid of current square colour then by reassigning takes new vairable values (from keydown listener) to make a new div colour with red.
  currentCharacterPosition.style.backgroundColor = 'white';
  currentCharacterPosition = document.querySelector(`div[rowid="${myPlayerSpot.row}"][columnid="${myPlayerSpot.column}"]`);
  currentCharacterPosition.style.backgroundColor = 'red';
}






window.addEventListener('keydown', function(e) {
  console.log(e.which);
  if (e.which === 38) {
    event.preventdefault;
    myPlayerSpot.row --;
    //stops character going over the edge - cant be === 0 becuase the ++ will make it row 1.
    if (myPlayerSpot.row === -1) {
      myPlayerSpot.row ++;
    }
    // MOVES UP
    // gets rid of current square colour then by reassigning takes new vairable values (from keydown listener) to make a new div colour with red.
    moveColor();


    if (currentCharacterPosition === currentCratePosition) {

      // when character and crate positions are equal - moves it right and makes new square the current square then makes it green.
      myCrateSpot.row --;
      // don't need to turn this square white as the charater will take over then to white when it leaves.
      currentCratePosition = document.querySelector(`div[rowid="${myCrateSpot.row}"][columnid="${myCrateSpot.column}"]`);
      currentCratePosition.style.backgroundColor = 'green';
    }

    // stops crate going over edge
    if (myCrateSpot.row === -1) {
      myCrateSpot.row ++;
      console.log(myCrateSpot);
    }

    // if (myCrateSpot.row === 0 && myPlayerSpot.row === 1) {
    //   console.log(myPlayerSpot);
    // }


  } else if (e.which === 40) {
    event.preventdefault;
    if (myPlayerSpot.row === 9) {
      myPlayerSpot.row --;
    }
    // MOVES DOWN
    myPlayerSpot.row ++;
    moveColor();
    if (currentCharacterPosition === currentCratePosition) {
      if (myCrateSpot.row === 0) {
        myCrateSpot.row --;
      }
      myCrateSpot.row ++;
      currentCratePosition = document.querySelector(`div[rowid="${myCrateSpot.row}"][columnid="${myCrateSpot.column}"]`);
      currentCratePosition.style.backgroundColor = 'green';
    }

  } else if (e.which === 37) {
    event.preventdefault;
    if (myPlayerSpot.column === 0) {
      myPlayerSpot.column ++;
    }
    // MOVES LEFT
    myPlayerSpot.column --;
    moveColor();
    if (currentCharacterPosition === currentCratePosition) {
      if (myCrateSpot.row === 0) {
        myCrateSpot.column --;
      }
      myCrateSpot.column --;
      currentCratePosition = document.querySelector(`div[rowid="${myCrateSpot.row}"][columnid="${myCrateSpot.column}"]`);
      currentCratePosition.style.backgroundColor = 'green';
    }

  } else if (e.which === 39) {
    event.preventdefault;
    if (myPlayerSpot.column === 9) {
      myPlayerSpot.column --;
    }
    // MOVES RIGHT
    myPlayerSpot.column ++;
    moveColor();
    if (currentCharacterPosition === currentCratePosition) {
      if (myCrateSpot.row === 0) {
        myCrateSpot.column ++;
      }
      myCrateSpot.column ++;
      currentCratePosition = document.querySelector(`div[rowid="${myCrateSpot.row}"][columnid="${myCrateSpot.column}"]`);
      currentCratePosition.style.backgroundColor = 'green';
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
