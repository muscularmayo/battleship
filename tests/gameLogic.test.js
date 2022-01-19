const gameLogic = require('../gameLogic')

describe('createShip does things', () => {
  let carrier;
  let cruiser;
  let destroyer;

  beforeEach(() => {
    carrier = gameLogic.createShip(5)
    cruiser = gameLogic.createShip(3)
    destroyer = gameLogic.createShip(2)
  })



  test('createShip makes an object', () => {
    expect(typeof cruiser).toBe('object')
    expect(typeof carrier).toBe('object')
    expect(typeof destroyer).toBe('object')

  })

  test('createShip makes different ships, represented by shipName, according to length', () => {
    expect(carrier.shipName).toBe('carrier')
    expect(cruiser.shipName).toBe('cruiser')
    expect(destroyer.shipName).toBe('destroyer')

  })

  test('createShip has a hit function that changes ship state', () => {
    expect(cruiser.hit(0)).toStrictEqual([-1,1,1])
    expect(carrier.hit(1)).toStrictEqual([1,-1,1,1,1])
    expect(carrier.hit(2)).toStrictEqual([1,-1,-1,1,1])
    expect(destroyer.hit(4).destroyer.hit(0)).toStrictEqual([-1,1,1,1,-1])

  })

  test('createShip has a isSunk function', () => {
    expect(cruiser.isSunk(cruiser.state)).toBe(false)
  })

  test('createShip creates a board state that is an array', () => {
    expect(carrier.state).toStrictEqual([-1,-1,-1,-1,-1])
    expect(destroyer.state).toStrictEqual([-1,-1])
    expect(cruiser.state).toStrictEqual([-1,-1,-1])
  })

  describe('createGameboard creates a gameboard', () => {
    let emptyGameboard = [
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0]
    ]

    let cruiserPlacedGameboard = [
      [-1,-1,-1,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0]
    ]
    let gameboard = gameLogic.createGameboard().gameboard

    test('createGameboard makes an array filled with 0\'s', () => {
      expect(gameboard).toEqual(emptyGameboard)
    })

    test('createGameboard.place() will place a particular boat in a particular spot', () => {
      expect(gameboard.placeShip(0,0,x,3)).toStrictEqual(cruiserPlacedGameboard)
    })


  })



  //test('createShip has ')
})