function createShip (shipName) {
  let length;
  if(shipName === 'destroyer') {
    length = 2;
  } else if (shipName === 'submarine') {
    length = 3;
  } else if (shipName === 'cruiser') {
    length = 3;
  } else if (shipName === 'battleship') {
    length = 4;
  } else if (shipName === 'carrier') {
    length = 5;
  }

  const createShipState = function(length) {
    let state = [];
    for(let i = 0; i < length; i++) {
      state[i] = 1;
    }
    return state
  }

  const coordinates = []



  const hit = function (num) {
    //num is now going to be the coordinates of the board, and we will be using something like, this.coordinates.indexOf(num)
    //this.coordinates will be an array of the coordinates we occupy with this specific ship
    if (state[num] === -2 || state[num] === -1) {
      console.log('error, this spot has already been fired upon');
      return;
    }
    state[num] -= 2;
    return state;
  } // i need to link hit with coordinates to my board somehow

  const isSunk = function() {
    if (this.state.includes(1)) {
      return false
    } else {
      console.log(`${this.shipName} has sunk!`)
      return true;
    }
  }
  const state = createShipState(length)

  return {
    length, state, isSunk, hit , coordinates , shipName
  }
}


function createGameboard () {
  const gameboard = []
  const shipContainer = {}

  //we're going to turn this into one array because board is always 10x10 no exceptions
  for(let i = 0; i < 100; i++) {
    gameboard[i] = 0;
  }



  const placeShip = function (coords, horizontal, shipName) {
    //placeship check

    const shipLength = this.shipContainer[shipName].length;

    const placeable = checkPlacement(coords, horizontal, shipLength)

    if (!placeable) {
      console.error('this ship cannot be placed')
      return 'error';
    }

    if(horizontal) {
      for (let i = coords; i < (coords + shipLength); i++) {
        console.log(coords);
        gameboard[i] = 1;
      }
    } else {
      for (let i = coords; i < coords + shipLength * 10; i = i + 10) {
        gameboard[i] = 1;
      }
    }

    return this.gameboard;
    //this.gameboard[yx]
  }

  function fillShipContainer () {
    shipContainer.carrier = createShip('carrier')
    shipContainer.battleship = createShip('battleship')
    shipContainer.cruiser = createShip('cruiser')
    shipContainer.submarine = createShip('submarine')
    shipContainer.destroyer = createShip('destroyer')

  }
  fillShipContainer();

  function receiveAttack (coords) {
    for (let i = 0; i < shipContainer.length; i++) {
      let currentShip = shipContainer[i]
      if(currentShip.coordinates.includes(coords)) {
        currentShip.hit(indexOf(coords));
        return;
      }
    }
  }
  function checkPlacement (coords, horizontal, shipLength) {
    if(horizontal) {
      console.log(gameboard, coords)
      //we check if our column number (coord%10) <= (10 - shipLength)
      if (coords % 10 <= 10 - shipLength) {
        console.log('first check passed')
        //then we need to check if every spot is currently a 0
        for(let i = coords; i < coords + shipLength; i++) {
          console.log('in the loop', i, shipLength)
          if(gameboard[i] === 1) {
            console.log('returning false')
            return false;
          }
        }
        return true;
      }
      return false;
    } else if (!horizontal) { //aka vertical
      //we check if our row number (Math.floor(coord/10) <= (10-shipLength)
      if (Math.floor(coords/10) <= (10 - shipLength)) {
        //check every 10th coord, representing a vertical line in a 10x10 grid
        for(let i = coords; i < coords + shipLength * 10; i = i + 10) {
          if(gameboard[i] === 1) {
            return false;
          }
        }
        return true;
      }
      return false;
      //if it is it's good, else it's bad
      //check if every spot is currently at 0, if it's not 0 then bad
    }
  }

  return { gameboard , placeShip, shipContainer, receiveAttack};
}

function createPlayer () {

}

/*
function createGameState () {

}*/

module.exports = { createShip, createGameboard, createPlayer }

/* ship output will look like

{state: [1,1,1,1,1],
shipName: 'carrier',
length: 5,
hit(coords) {
  this.state[this.coordinates.indexOf(coords)] -= 2
}
isSunk() {
  if(!this.state.includes(1)) {
    return true;
  } else {
    return false;
  }
}
coordinates: [82,83,84,85,86]


}


*/