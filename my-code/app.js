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


const myHoleSpot = {
  row: 8,
  column: 8
};


// for tracking the characters and all, make a variable that you use in your dom.
// get the div for the character with the following variables then change the colour to red and give it a class of active for the image.
let currentCharacterPosition = document.querySelector(`div[rowid="${myPlayerSpot.row}"][columnid="${myPlayerSpot.column}"]`);
// currentCharacterPosition.classList.add('active');
console.log(currentCharacterPosition);
currentCharacterPosition.style.backgroundColor = 'red';

// get the div for the crate, colour it green and make it a let so you can reassign the let to another div.
let currentCratePosition = document.querySelector(`div[rowid="${myCrateSpot.row}"][columnid="${myCrateSpot.column}"]`);
currentCratePosition.style.backgroundColor = 'green';

// get the div for the hole and colour it black.
let currentHolePosition = document.querySelector(`div[rowid="${myHoleSpot.row}"][columnid="${myHoleSpot.column}"]`);
currentHolePosition.style.backgroundColor = 'black';



function moveColor() {
  // gets rid of current square colour then by reassigning takes new vairable values (from keydown listener) to make a new div colour with red.
  currentCharacterPosition.style.backgroundColor = 'white';
  currentCharacterPosition = document.querySelector(`div[rowid="${myPlayerSpot.row}"][columnid="${myPlayerSpot.column}"]`);
  currentCharacterPosition.style.backgroundColor = 'red';
}



window.addEventListener('keydown', function(e) {
  // console.log(e.which);
  if (e.which === 38) {
    event.preventdefault;

    // stops character moving onto crate when crate is at wall and allows code to run otherwise.
    if (myCrateSpot.row === 0
      && myPlayerSpot.row === 1
      && myCrateSpot.column === myPlayerSpot.column) {
      console.log('dont move!');
    } else {
      // MOVES UP
      myPlayerSpot.row --;


      //stops character going over the edge - cant be === 0 becuase the ++ will make it row 1.
      if (myPlayerSpot.row === -1) {
        myPlayerSpot.row ++;
      }


      // gets rid of current square colour then by reassigning takes new vairable values (from keydown listener) to make a new div colour with red.
      moveColor();


      if (myPlayerSpot.row === myCrateSpot.row
         && myPlayerSpot.column === myCrateSpot.column) {

        // moves in character direction - when character moves onto crate (code above) - moves crate up and makes new square the current square then makes it green.
        myCrateSpot.row --;

        // don't need to turn this square white as the charater will take over then to white when it leaves.
        currentCratePosition = document.querySelector(`div[rowid="${myCrateSpot.row}"][columnid="${myCrateSpot.column}"]`);
        currentCratePosition.style.backgroundColor = 'green';
      }
    }

    // if the crate position === the hole position - make the position black to cover the green, change the crate vars to 0, 0 by
    // ----- minusing the hol vars then reassign the crate position and colour so it shows up at the top right
    if (myCrateSpot.row === myHoleSpot.row
       && myCrateSpot.column === myHoleSpot.column) {
      currentHolePosition.style.backgroundColor = 'black';
      myCrateSpot.row -= myHoleSpot.row;
      myCrateSpot.column -= myHoleSpot.column;
      currentCratePosition = document.querySelector(`div[rowid="${myCrateSpot.row}"][columnid="${myCrateSpot.column}"]`);
      currentCratePosition.style.backgroundColor = 'green';
    }


  } else if (e.which === 40) {
    event.preventdefault;

    if (myCrateSpot.row === 9
      && myPlayerSpot.row === 8
      && myCrateSpot.column === myPlayerSpot.column) {
      console.log('dont move!');
    } else {

      // MOVES DOWN
      myPlayerSpot.row ++;

      if (myPlayerSpot.row === 10) {
        myPlayerSpot.row --;
      }

      moveColor();

      if (myPlayerSpot.row === myCrateSpot.row
        && myPlayerSpot.column === myCrateSpot.column) {

        myCrateSpot.row ++;

        currentCratePosition = document.querySelector(`div[rowid="${myCrateSpot.row}"][columnid="${myCrateSpot.column}"]`);
        currentCratePosition.style.backgroundColor = 'green';
      }
    }

    if (myCrateSpot.row === myHoleSpot.row
       && myCrateSpot.column === myHoleSpot.column) {
      currentHolePosition.style.backgroundColor = 'black';
      myCrateSpot.row -= myHoleSpot.row;
      myCrateSpot.column -= myHoleSpot.column;
      currentCratePosition = document.querySelector(`div[rowid="${myCrateSpot.row}"][columnid="${myCrateSpot.column}"]`);
      currentCratePosition.style.backgroundColor = 'green';
    }


  } else if (e.which === 37) {
    event.preventdefault;

    if (myCrateSpot.column === 0
      && myPlayerSpot.column === 1
      && myCrateSpot.row === myPlayerSpot.row) {
      console.log('dont move!');
    } else {

      // MOVES LEFT
      myPlayerSpot.column --;

      if (myPlayerSpot.column === -1) {
        myPlayerSpot.column ++;
      }

      moveColor();

      if (myPlayerSpot.row === myCrateSpot.row
        && myPlayerSpot.column === myCrateSpot.column) {

        myCrateSpot.column --;

        currentCratePosition = document.querySelector(`div[rowid="${myCrateSpot.row}"][columnid="${myCrateSpot.column}"]`);
        currentCratePosition.style.backgroundColor = 'green';
      }
    }

    if (myCrateSpot.row === myHoleSpot.row
       && myCrateSpot.column === myHoleSpot.column) {
      currentHolePosition.style.backgroundColor = 'black';
      myCrateSpot.row -= myHoleSpot.row;
      myCrateSpot.column -= myHoleSpot.column;
      currentCratePosition = document.querySelector(`div[rowid="${myCrateSpot.row}"][columnid="${myCrateSpot.column}"]`);
      currentCratePosition.style.backgroundColor = 'green';
    }


  } else if (e.which === 39) {
    event.preventdefault;

    if (myCrateSpot.column === 9
      && myPlayerSpot.column === 8
      && myCrateSpot.row === myPlayerSpot.row) {
      console.log('dont move!');
    } else {

      // MOVES RIGHT
      myPlayerSpot.column ++;

      if (myPlayerSpot.column === 10) {
        myPlayerSpot.column --;
      }

      moveColor();

      if (myPlayerSpot.row === myCrateSpot.row
        && myPlayerSpot.column === myCrateSpot.column) {

        myCrateSpot.column ++;

        currentCratePosition = document.querySelector(`div[rowid="${myCrateSpot.row}"][columnid="${myCrateSpot.column}"]`);
        currentCratePosition.style.backgroundColor = 'green';
      }
    }

    if (myCrateSpot.row === myHoleSpot.row
       && myCrateSpot.column === myHoleSpot.column) {
      currentHolePosition.style.backgroundColor = 'black';
      myCrateSpot.row -= myHoleSpot.row;
      myCrateSpot.column -= myHoleSpot.column;
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
