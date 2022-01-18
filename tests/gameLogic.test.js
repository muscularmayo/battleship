const gameLogic = require('../gameLogic')

describe('createShip does things', () => {
let carrier;
let cruiser;
let destroyer;
  beforeAll(() => {
    carrier = gameLogic.createShip(5)
    cruiser = gameLogic.createShip(3)
    destroyer = gameLogic.createShip(2)
  })

  test('createShip makes an object', () => {
    expect(typeof cruiser).toBe('object')
    expect(typeof carrier).toBe('object')
    expect(typeof destroyer).toBe('object')

  })

  test('createShip makes different ships', () => {
    expect(carrier.shipName).toBe('carrier')
    expect(cruiser.shipName).toBe('cruiser')
    expect(destroyer.shipName).toBe('destroyer')

  })

  test('createShip has a hit function that changes ship state', () => {
    expect(cruiser.hit(0)).toBe([1,-1,-1])
    expect(carrier.hit(0)).toBe([1,-1,-1,-1,-1])

  })

  test('createShip has a isSunk function', () => {
    expect(cruiser.isSunk(cruiser.state)).toBe(false)
  })

  test('createShip creates a board state that is an array', () => {
    expect(carrier.state).toEqual([-1,-1,-1,-1,-1])
    expect(destroyer.state).toEqual([-1,-1])
    expect([...cruiser.state]).toEqual([-1,-1,-1])
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