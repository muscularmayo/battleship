const gameLogic = require('../gameLogic')

describe('createShip does things', () => {
let cruiser;
  beforeAll(() => {
    cruiser = gameLogic.createShip(5)
  })

  test('createShip makes an object', () => {
    expect(typeof gameLogic.createShip()).toBe('object')
  })

  test('createShip has a hit function', () => {
    expect(cruiser.hit()).toExist()
  })

  test('createShip has a isSunk function', () => {
    expect(cruiser.isSunk()).toBe(false)
  })

  test('createShip creates a board state that is an array', () => {
    expect(cruiser.state).toStrictEqual([-1,-1,-1,-1,-1])
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

    test('createGameboard makes an array filled with 0\'s', () => {
      expect(gameLogic.createGameboard().gameboard).toEqual(emptyGameboard)
    })


  })



  //test('createShip has ')
})