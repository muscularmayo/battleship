function createShip (length) {
  const createShipState = function(length) {
    let state = [];
    for(let i = 0; i < length; i++) {
      state[i] = -1;
    }
    return state
  }
  let state = createShipState(length)


  const hit = function (num) {
    state[num] = 1;
    return state;
  }

  const isSunk = function(state) {
    if (!state.includes(-1)) {
      return true
    } else {
      return false;
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

function createGameboard () {
  let gameboard = []
  for(let i = 0; i < 10; i++) {
    gameboard[i] = []
    for(let j = 0; j < 10; j++) {
        gameboard[i][j] = 0;
    }
  }

  return { gameboard       };
}

function createPlayer () {

}

module.exports = { createShip, createGameboard, createPlayer }

/* ship output will look like




*/