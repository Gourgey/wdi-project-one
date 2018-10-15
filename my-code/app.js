// make a grid
const myContainer = document.querySelector('#container');


let currentCharacterPosition = document.querySelector(`div[rowid="${myPlayerSpot.row}"][columnid="${myPlayerSpot.column}"]`);
console.log(currentCharacterPosition);
// currentCharacterPosition.classList.add('active');
currentCharacterPosition.style.backgroundColor = 'red';


let currentCratePosition = document.querySelector(`div[rowid="${myCrateSpot.row}"][columnid="${myCrateSpot.column}"]`);
currentCratePosition.style.backgroundColor = 'green';


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





function moveColor() {
  currentCharacterPosition.style.backgroundColor = 'white';
  const newCharacterPosition = document.querySelector(`div[rowid="${myPlayerSpot.row}"][columnid="${myPlayerSpot.column}"]`);
  currentCharacterPosition = newCharacterPosition;
  currentCharacterPosition.style.backgroundColor = 'red';
}






window.addEventListener('keydown', function(e) {
  console.log(e.which);
  if (e.which === 38) {
    event.preventdefault;
    if (myPlayerSpot.row === 0) {
      myPlayerSpot.row ++;
    }
    myPlayerSpot.row --;
    moveColor();


  } else if (e.which === 40) {
    event.preventdefault;
    if (myPlayerSpot.row === 9) {
      myPlayerSpot.row --;
    }
    myPlayerSpot.row ++;
    moveColor();


  } else if (e.which === 37) {
    event.preventdefault;
    if (myPlayerSpot.column === 0) {
      myPlayerSpot.column ++;
    }
    myPlayerSpot.column --;
    moveColor();


  } else if (e.which === 39) {
    event.preventdefault;
    //stops character square going over the edge
    if (myPlayerSpot.column === 9) {
      myPlayerSpot.column --;
    }
    //moves character square right
    myPlayerSpot.column ++;
    //when it hits the green crate it moves it turns square white to make it dissapear.
    if (currentCharacterPosition === currentCratePosition) {
      currentCratePosition.style.backgroundColor = 'white';
      // moves it right and makes new square the current square then makes it green.
      myCrateSpot.column ++;
      const newCratePosition = document.querySelector(`div[rowid="${myCrateSpot.row}"][columnid="${myCrateSpot.column}"]`);
      currentCratePosition = newCratePosition;
      currentCratePosition.style.backgroundColor = 'green';
    }
    moveColor();
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
