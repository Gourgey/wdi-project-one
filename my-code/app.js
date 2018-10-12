// make a grid
const myContainer = document.querySelector('#container');
// const $myContainer = $('#container');

// let superId = 1;



function createGrid(x) {
  for (let rows = 0; rows < x; rows++) {
    for (let columns = 0; columns < x; columns++) {
      const myGrid = document.createElement('div');
      myGrid.classList.add('grid');
      myGrid.setAttribute('id', 'happy' + columns);
      myContainer.appendChild(myGrid);
    }
  }
  // myGrid.style.width = 50;
  // myGrid.style.height = 960;
  // $('.grid').height(960/x);
}


createGrid(10);


let playerIdLocationYouMakeYourOwnName = 9;

//you can't use happy + player...
//this needs to keep track of the previous position and remove it
const currentPosition = document.querySelector(`#happy${playerIdLocationYouMakeYourOwnName}`);
currentPosition.style.backgroundColor = 'red';

// for tracking the characters and all, make a variable that you use in your dom
function moveColor() {
  playerIdLocationYouMakeYourOwnName ++;
}


// window.addEventListener('keydown', function(e) {
//   console.log(e.which);
//   if (e.which === 38) {
//     alert('Player 1 moved up');
//   } else if (e.which === 40) {
//     alert('Player 1 moved down');
//   } else if (e.which === 37) {
//     alert('Player 1 moved left');
//   } else if (e.which === 39) {
//     alert('Player 1 moved left');
//   }
// });
