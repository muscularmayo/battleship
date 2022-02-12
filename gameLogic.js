
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
  } else {
    return undefined
  }

  const createShipState = function(length) {
    let state = [];
    for(let i = 0; i < length; i++) {
      state[i] = 1;
    }
    return state
  }

  const coordinates = []



  const hit = function (coords) {
    //this.coordinates will be an array of the coordinates we occupy with this specific ship
    //convert coords to an index on ship state
    let num = this.coordinates.indexOf(coords)
    if (this.state[num] === -1 || num < 0 || num > 99) {
      console.error('doesn\t exist on ship or already been fired upon, or negative #');
      return 'error'
    }
    this.state[num] -= 2;
    return this.state;
  } // i need to link hit with coordinates to my board somehow

  const isSunk = function() {
    if (this.state.includes(1)) {
      return false
    } else {
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

  //we're going to turn this into one array because board is always 10x10 (100 spaces) no exceptions
  for(let i = 0; i < 100; i++) {
    gameboard[i] = 0;
  }



  const placeShip = function (coords, horizontal, shipName) {
    const shipLength = shipContainer[shipName].length;
    //horiz true = horizontal placement
    if (shipContainer[shipName].coordinates.length > 0) {
      //in case we're re-placing the ship on the board, reset coords/board state
      for (let i = 0; i < this.shipContainer[shipName].coordinates.length; i++) {
        gameboard[shipContainer[shipName].coordinates[i]] = 0;
      }
      shipContainer[shipName].coordinates = []

    }

    //placeship check
    //console.log(this.shipContainer)
    const placeable = checkPlacement(coords, horizontal, shipLength)
    //console.log(shipLength, placeable)

    if (!placeable) {
      console.error(`${shipName} cannot be placed at ${coords}. horizontal: ${!!horizontal} vertical: ${!horizontal}`)
      return 'error';
    }



    if (horizontal) {
      for (let i = coords; i < (coords + shipLength); i++) {
        //console.log(coords, i);
        shipContainer[shipName].coordinates.push(i)
        gameboard[i] = 1;
      }
    } else {
      for (let i = coords; i < coords + shipLength * 10; i = i + 10) {
        shipContainer[shipName].coordinates.push(i)
        gameboard[i] = 1;
      }
    }

    return gameboard;
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
  //console.log(Object.values(shipContainer))

  function randomlyPlace () {
    //we want to fill our gameboard with all 5 ships, we must check coordinates randomly
    Object.values(this.shipContainer).forEach((e) => {

      recursivelyPlace(e.shipName)
    })
  }

  function allPlaced () {
    //if all the ships are placed return true, else false
    let allPlacedFlag = false
    allPlacedFlag = Object.values(this.shipContainer).every((e) => {
      return e.coordinates.length > 0;
    })

    return allPlacedFlag;
  }

  function recursivelyPlace (shipName) {
    let randomCoord = Math.floor(Math.random() * 100)
    let horizontalBoolean = Math.floor(Math.random() * 2)
    let x = placeShip(randomCoord, horizontalBoolean, shipName)
    if (x === 'error') {
      return recursivelyPlace(shipName)
    }
    return;
  }

  function receiveAttack (coords) {
    // receive an input of 0-99, representing coords on my array
    if(gameboard[coords] === -1 || gameboard[coords] === -2) {
      return 'error'
    }
    if(gameboard[coords] === 1) {
      Object.values(this.shipContainer).forEach(element => {
        if (element.coordinates.includes(coords)) {
          element.hit(coords)
          if(element.isSunk()) {
            console.log(`${element.shipName} has sunk!`)

            return `${element} has sunk!`
          }
        }
      })
    }
    // then just -2 i guess to whatever that is on gameboard
    this.gameboard[coords] -= 2;


    return this.gameboard
    // if it turns out that gameboard[coords] === 1 (before) or === -1 (after)
    //    then we need to hunt for which ship is at these coordinates

    // Object.values(this.shipContainer) turns into [{}, {}, {}, {}, {}]
    // then i can use array.forEach? and then look through the coordinates for a hit
    // if it hits we must use that ship's function and isSunk function

    // this.shipContainer.keys ??
    // for (let i = 0; i < shipContainer.length; i++) {
    //   let currentShip = shipContainer[i]
    //   if(currentShip.coordinates.includes(coords)) {
    //     currentShip.hit(indexOf(coords));
    //   }
    // }
  }
  function checkPlacement (coords, horizontal, shipLength) {
    if (typeof shipLength === 'string') {
      shipLength = this.shipContainer[shipLength].length;
    }
    if(horizontal) {
      //console.log(gameboard, coords)
      //we check if our column number (coord%10) <= (10 - shipLength)
      if (coords % 10 <= 10 - shipLength) {
        //then we need to check if every spot is currently a 0
        for(let i = coords; i < coords + shipLength; i++) {
          if(gameboard[i] === 1) {
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
    return false;
  }

  function allSunk() {
    let sunkFlag = false;
    sunkFlag = Object.values(this.shipContainer).every((e) => {
      return e.isSunk();
    })
    return sunkFlag;
  }

  return { gameboard , placeShip, shipContainer, receiveAttack, allSunk, randomlyPlace, checkPlacement, allPlaced};
}


function createGameState () {
  let human = {}
  human.gameboard = createGameboard()
  human.player = createPlayer(true)
  let cpu = {}
  cpu.gameboard = createGameboard()
  cpu.player = createPlayer(false)
}

export { createShip, createGameboard, createGameState }

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