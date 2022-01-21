function createShip (length) {
  if (length < 2 || length > 5) {
    console.error('ship length must be between 2 & 5')
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
    //
    if (state[num] === -2) {
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
      return true;
    }
  }

  const determineShipName = function(length) {
    let shipName = 'unknown'
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
  let state = createShipState(length)
  const shipName = determineShipName(length)

  return {
    length, state, isSunk, hit , shipName , coordinates
  }
}

function createGameboard (home) {
  let gameboard = []
  //we're going to turn this into one array because board is always 10x10 no exceptions
  for(let i = 0; i < 100; i++) {
    gameboard[i] = 1;
  }

  let player;
  if(home) {
    player = 'home'
  } else {
    player = 'away'
  }

  const placeShip = function (coords, horizontal, shipLength) {
    //yx = row/col; this is the starting place for the ship we're putting down.
    //placeship check
    if(horizontal) {
      for (let i = coords; i < coords + shiplength)
    }
    //this.gameboard[yx]
  }




  return { gameboard , player, placeShip};
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