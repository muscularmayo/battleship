const gameLogic = require('../gameLogic')
//we need to test createShip, createGameboard, createPlayer, and finally gameState which is a collection of all 3
//ship object has length, name, state, hit(), isSunk()
//gameboard object has state, placeShip, receiveAttack
//player object is literally just player1 or player2??
//overall gamestate should include all of these, it should have 2 gameboards, 2 collections of 5 boats, player1 vs 2 turn

describe('createShip creates a few different types of ships', () => {
  let carrier;
  let cruiser;
  let destroyer;
  let submarine;
  let battleship;

  beforeEach(() => {
    carrier = gameLogic.createShip('carrier');
    cruiser = gameLogic.createShip('cruiser');
    destroyer = gameLogic.createShip('destroyer');
    submarine = gameLogic.createShip('submarine');
    battleship = gameLogic.createShip('battleship');
  })

  test('createShip returns an object', () => {
    expect(typeof cruiser).toBe('object');
    expect(typeof carrier).toBe('object');
    expect(typeof destroyer).toBe('object');
    expect(typeof battleship).toBe('object');
    expect(typeof submarine).toBe('object');
  })

  test('if createShip is given a name outside of the 5 expected names it returns undefined', () => {
    let unknown = gameLogic.createShip('unknown');
    let whatever = gameLogic.createShip('whatever');
    let random = gameLogic.createShip('askjdfhaslhf');
    expect(unknown).toBe(undefined);
    expect(whatever).toBe(undefined);
    expect(random).toBe(undefined);
  })

  test('createShip has the proper length property associated with the shipName given', () => {
    expect(cruiser.length).toBe(3);
    expect(carrier.length).toBe(5);
    expect(destroyer.length).toBe(2);
    expect(submarine.length).toBe(3);
    expect(battleship.length).toBe(4);
  })

  test('createShip creates a board state that is an array', () => {
    expect(carrier.state).toStrictEqual([1,1,1,1,1]);
    expect(destroyer.state).toStrictEqual([1,1]);
    expect(cruiser.state).toStrictEqual([1,1,1]);
    expect(submarine.state).toStrictEqual([1,1,1]);
    expect(battleship.state).toStrictEqual([1,1,1,1]);
  })

  test('createShip returns different ships based on the shipName entered', () => {
    expect(carrier.shipName).toBe('carrier');
    expect(cruiser.shipName).toBe('cruiser');
    expect(destroyer.shipName).toBe('destroyer');
    expect(submarine.shipName).toBe('submarine');
    expect(battleship.shipName).toBe('battleship');
  })

  test('createShip has an empty coordinates array on default', () => {
    expect(carrier.coordinates).toStrictEqual([]);
    expect(cruiser.coordinates).toStrictEqual([]);
    expect(destroyer.coordinates).toStrictEqual([]);
    expect(submarine.coordinates).toStrictEqual([]);
    expect(battleship.coordinates).toStrictEqual([]);
  })

  test('createShip has a hit function that changes ship state', () => {
    cruiser.coordinates = [82, 83, 84]
    carrier.coordinates = [10, 20, 30, 40, 50]
    destroyer.coordinates = [11, 12]
    submarine.coordinates = [23, 33, 43]
    battleship.coordinates = [71, 72, 73, 74]
    expect(cruiser.hit(82)).toStrictEqual([-1,1,1]);

    expect(carrier.hit(20)).toStrictEqual([1,-1,1,1,1]);
    expect(carrier.hit(30)).toStrictEqual([1,-1,-1,1,1]);

    expect(destroyer.hit(12)).toStrictEqual([1,-1]);
    expect(destroyer.hit(12)).toBe('error');
    expect(destroyer.hit(11)).toStrictEqual([-1,-1]);

    expect(battleship.hit()).toBe('error');
    expect(battleship.hit(74)).toStrictEqual([1,1,1,-1]);
    expect(battleship.hit(73)).toStrictEqual([1,1,-1,-1]);
    expect(battleship.hit(72)).toStrictEqual([1,-1,-1,-1]);
    expect(battleship.hit(72)).toStrictEqual('error');
    expect(battleship.hit(-1)).toBe('error');

    expect(submarine.hit(23)).toStrictEqual([-1,1,1]);
    expect(submarine.hit(33)).toStrictEqual([-1,-1,1]);
    expect(submarine.hit(43)).toStrictEqual([-1,-1,-1]);

  })

  test('createShip has a isSunk function that returns true when ship state is all -1 (hit)', () => {
    cruiser.coordinates = [82, 83, 84]
    carrier.coordinates = [10, 20, 30, 40, 50]
    destroyer.coordinates = [11, 12]
    submarine.coordinates = [23, 33, 43]
    battleship.coordinates = [71, 72, 73, 74]

    expect(destroyer.isSunk()).toBe(false)
    destroyer.hit(12)
    expect(destroyer.isSunk()).toBe(false)
    destroyer.hit(11)
    expect(destroyer.isSunk()).toBe(true)

    expect(cruiser.isSunk()).toBe(false)
    cruiser.hit(82)
    expect(cruiser.isSunk()).toBe(false)
    cruiser.hit(83)
    expect(cruiser.isSunk()).toBe(false)
    cruiser.hit(84)
    expect(cruiser.isSunk()).toBe(true)
  })

})


describe('createGameboard creates a gameboard with functions/containers', () => {

  let emptyGameboard = [
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0
  ]

  let cruiserPlacedGameboard = [
    1,1,1,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0
  ]

  let verticalPlacedGameboard = [
    1,1,1,0,0,0,0,0,0,0,
    0,1,0,0,0,0,0,0,0,0,
    0,1,0,0,0,0,0,0,0,0,
    0,1,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0
  ]

  let topLeftCornerAttackedGameboard = [
    -2,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0
  ]

  let bottomLeftCornerAttackedGameboard = [
    -1,1,1,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    -2,0,0,0,0,0,0,0,0,0
  ]

  let carrierPlacedGameboard = [
    1,1,1,0,0,0,0,0,0,0,
    0,1,0,0,0,0,0,0,0,0,
    0,1,0,0,0,1,1,1,1,1,
    0,1,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0
  ]

  let receiveAttack1Gameboard = [
    -2,-1,1,1,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0
  ]

  let gameboard;

  beforeEach(() => {
    gameboard = gameLogic.createGameboard()
    gameboard2 = gameLogic.createGameboard()
  })

  test('createGameboard makes an array filled with 0\'s', () => {
    expect(gameboard.gameboard).toEqual(emptyGameboard)
  })

  test('placeShip() will place a boat of certain length in a spot vertically or horizontally, but not if it\'s occupied or goes over the edge of the board', () => {
    expect(gameboard.placeShip(0,true,'cruiser')).toStrictEqual(cruiserPlacedGameboard)
    expect(gameboard.placeShip(1,false,'submarine')).toBe('error')
    expect(gameboard.placeShip(11,false,'submarine')).toStrictEqual(verticalPlacedGameboard)
    expect(gameboard.placeShip(10,true,'carrier')).toStrictEqual('error')
    expect(gameboard.placeShip(26,true,'carrier')).toStrictEqual('error')
    expect(gameboard.placeShip(25,true,'carrier')).toStrictEqual(carrierPlacedGameboard)

    expect(gameboard2.placeShip(0,true,'cruiser')).toStrictEqual(cruiserPlacedGameboard)
    expect(gameboard2.placeShip(11,false,'submarine')).toStrictEqual(verticalPlacedGameboard)
    expect(gameboard2.placeShip(10,true,'carrier')).toStrictEqual('error')
    expect(gameboard2.placeShip(26,true,'carrier')).toStrictEqual('error')
    expect(gameboard2.placeShip(25,true,'carrier')).toStrictEqual(carrierPlacedGameboard)
    //console.log('gameboard: ', gameboard)
  })

  test('gameboard changes the ship\'s coordinates after it uses placeShip(), and resets it if placed twice', () => {
    gameboard.placeShip(0, true, 'cruiser');
    expect(gameboard.shipContainer.cruiser.coordinates).toStrictEqual([0,1,2])
    gameboard.placeShip(0, false, 'cruiser');
    expect(gameboard.shipContainer.cruiser.coordinates).toStrictEqual([0,10,20])
    expect(gameboard.placeShip(0, false, 'destroyer')).toBe('error')
    gameboard.placeShip(10, false, 'cruiser')
    expect(gameboard.shipContainer.cruiser.coordinates).toStrictEqual([10,20,30])


    gameboard.placeShip(4, false, 'battleship')
    expect(gameboard.shipContainer.battleship.coordinates).toStrictEqual([4,14,24,34])
    expect(gameboard.placeShip(4, true, 'submarine')).toBe('error')
    gameboard.placeShip(4, true, 'battleship')
    expect(gameboard.shipContainer.battleship.coordinates).toStrictEqual([4,5,6,7])
    gameboard.placeShip(12, true, 'battleship')
    expect(gameboard.shipContainer.battleship.coordinates).toStrictEqual([12,13,14,15])


  })


  test('gameboard has a receiveAttack function that changes board state in that position to position-2', () => {
    expect(gameboard.receiveAttack(0)).toStrictEqual(topLeftCornerAttackedGameboard)

    gameboard.placeShip(1, true, 'cruiser')
    gameboard.receiveAttack(1)
    expect(gameboard.gameboard).toStrictEqual(receiveAttack1Gameboard)
    expect(gameboard.shipContainer.cruiser.state).toStrictEqual([-1, 1, 1])

  })

  test('gameboard will not place a ship that will overlap on another ship', () => {
    gameboard.placeShip(0,true,'cruiser')
    expect(gameboard.placeShip(0,true,'destroyer')).toBe('error')
    expect(gameboard.placeShip(0,false,'submarine')).toBe('error')
    expect(gameboard.placeShip(1,false,'submarine')).toBe('error')
    expect(gameboard.placeShip(1,true,'submarine')).toBe('error')
    expect(gameboard.placeShip(2,false,'destroyer')).toBe('error')
    expect(gameboard.placeShip(2,true,'carrier')).toBe('error')

    expect(gameboard.gameboard).toStrictEqual(cruiserPlacedGameboard)
  })

  test('gameboard can check if all the ships have sunk', () => {
    expect(gameboard.allSunk()).toBe(false)
    gameboard.shipContainer.destroyer.state = [-1, -1]
    expect(gameboard.allSunk()).toBe(false)

    gameboard.shipContainer.cruiser.state = [-1, -1, -1]
    expect(gameboard.allSunk()).toBe(false)

    gameboard.shipContainer.submarine.state = [-1, -1, -1]
    expect(gameboard.allSunk()).toBe(false)

    gameboard.shipContainer.battleship.state = [-1, -1, -1, -1]
    expect(gameboard.allSunk()).toBe(false)

    gameboard.shipContainer.carrier.state = [-1, -1, -1, -1, -1]
    expect(gameboard.allSunk()).toBe(true)

    expect(gameboard2.allSunk()).toBe(false)
  })

  test('gameboard is capable of randomly placing all my ships', () => {
    expect(gameboard.gameboard).toStrictEqual(emptyGameboard);
    gameboard.randomlyPlace();
    console.log(gameboard)
    let x = gameboard.gameboard.reduce((prev, curr) => {
      return prev + curr
    })
    expect(x).toBe(17)
  })


})

xdescribe('player is an object that tells us whether it\'s player1 or player2\'s turn', () => {
  test('player is an object', () => {
    expect(typeof player).toBe('object')
  })

  test('player has a property called player1Turn that is a boolean', () => {
    expect(typeof player.player1Turn).toBe('boolean')
  })
})

/* focus on player/ships/board and then we will be good
describe('gameState is a collection of ship,gameboard, and player state objects', () => {
  beforeEach(()=> {

  })
  test('gameState has 3 properties, player1, player2, and player1Turn', () => {

  })
})*/



//test('createShip has ')
