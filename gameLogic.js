function createShip (length) {

  const createShipState = function(length) {
    let state = [];
    for(let i = 0; i < length; i++) {
      state[i] = 1;
    }
    return state
  }

  let state = createShipState(length)


  const hit = function (num) {
    if (state[num] === -2) {
      console.log('error, this spot has already been fired upon');
      return;
    }
    state[num] -= 2;
    return state;
  }

  const isSunk = function() {
    if (this.state.includes(1)) {
      return false
    } else {
      return true;
    }
  }

  const determineShipName = function(length) {
    let shipName = ''
    if (length === 5) {
      shipName = 'carrier'
    } else if (length === 4) {
      shipName = 'battleship'
    } else if (length === 3) {
      shipName = 'cruiser'
    } else if  (length === 2) {
      shipName = 'destroyer'
    }
    return shipName
  }

  const shipName = determineShipName(length)

  return {
    length, state, isSunk, hit , shipName
  }
}



function createGameboard (home) {
  let gameboard = []
  for(let i = 0; i < 10; i++) {
    gameboard[i] = []
    for(let j = 0; j < 10; j++) {
        gameboard[i][j] = 0;
    }
  }

  let player;
  if(home) {
    player = 'home'
  } else {
    player = 'away'
  }

  const placeShip = function (y, x, horizontal, shipLength) {
    if(placeShipCheck(y,x,shipLength)) {
      if (horizontal) {
        for(let i = x; i < x + shipLength; i++) {
          gameboard[y][i] = 1
        }
      } else if (!horizontal) {
        for(let i = y; i < y + shipLength; i++) {
          gameboard[i][x] = 1
        }
      }
    }
  }




  return { gameboard , player, placeShip};
}

function createPlayer () {

}

module.exports = { createShip, createGameboard, createPlayer }

/* ship output will look like




*/