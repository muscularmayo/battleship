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

  beforeEach(() => {
    carrier = gameLogic.createShip('carrier')
    cruiser = gameLogic.createShip('cruiser')
    destroyer = gameLogic.createShip('destroyer')
  })

  test('createShip returns an object', () => {
    expect(typeof cruiser).toBe('object')
    expect(typeof carrier).toBe('object')
    expect(typeof destroyer).toBe('object')

  })

  test('createShip has a proper length property', () => {
    expect(cruiser.length).toBe(3)
    expect(destroyer.length).toBe(2)
    expect(carrier.length).toBe(5)
  })

  test('createShip creates a board state that is an array', () => {
    expect(carrier.state).toStrictEqual([1,1,1,1,1])
    expect(destroyer.state).toStrictEqual([1,1])
    expect(cruiser.state).toStrictEqual([1,1,1])
  })

  test('createShip returns different ships, represented by shipName, according to length', () => {
    expect(carrier.shipName).toBe('carrier')
    expect(cruiser.shipName).toBe('cruiser')
    expect(destroyer.shipName).toBe('destroyer')

  })

  test('createShip has an empty coordinates array on default', () => {
    expect(carrier.coordinates).toStrictEqual([]);
    expect(cruiser.coordinates).toStrictEqual([]);
    expect(destroyer.coordinates).toStrictEqual([]);
  })

  test('createShip has a hit function that changes ship state', () => {
    expect(cruiser.hit(0)).toStrictEqual([-1,1,1])
    expect(carrier.hit(1)).toStrictEqual([1,-1,1,1,1])
    expect(carrier.hit(2)).toStrictEqual([1,-1,-1,1,1])
    expect(destroyer.hit(1)).toStrictEqual([1,-1])
    expect(destroyer.hit(0)).toStrictEqual([-1,-1])
  })

  test('createShip has a isSunk function', () => {
    expect(cruiser.isSunk()).toBe(false)
    expect(destroyer.isSunk()).toBe(false)
    destroyer.hit(1)
    expect(destroyer.isSunk()).toBe(false)
    destroyer.hit(0)
    expect(destroyer.isSunk()).toBe(true)
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
    -1,1,1,0,0,0,0,0,0,0,
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

  let gameboard;

  beforeEach(() => {
    gameboard = gameLogic.createGameboard()
  })

  test('createGameboard makes an array filled with 0\'s', () => {
    expect(gameboard.gameboard).toEqual(emptyGameboard)
  })

  test('createGameboard.placeShip() will place a boat of certain length in a spot vertically or horizontally', () => {
    expect(gameboard.placeShip(0,true,'cruiser')).toStrictEqual(cruiserPlacedGameboard)
    expect(gameboard.placeShip(11,false,'submarine')).toStrictEqual(verticalPlacedGameboard)
    expect(gameboard.placeShip(10,true,'carrier')).toStrictEqual('error')
    expect(gameboard.placeShip(26,true,'carrier')).toStrictEqual('error')
    expect(gameboard.placeShip(25,true,'carrier')).toStrictEqual(carrierPlacedGameboard)
  })

  test('gameboard changes the ship\'s coordinates after it uses placeShip()', () => {

  })


  /*test('gameboard has a receiveAttack function that changes board state in that position to position-2', () => {
    expect(gameboard.receiveAttack(0,0)).toStrictEqual(topLeftCornerAttackedGameboard)
    expect(gameboard.receiveAttack(0,9)).toStrictEqual(bottomLeftCornerAttackedGameboard)
  })*/

  test('gameboard will not place a ship that will overlap on another ship', () => {
    gameboard.placeShip(0,true,'cruiser')
    expect(gameboard.placeShip(0,true,'destroyer')).toBe('error')
    expect(gameboard.placeShip(0,false,'submarine')).toBe('error')
  })


})

describe('player is an object that tells us whether it\'s player1 or player2\'s turn', () => {
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
