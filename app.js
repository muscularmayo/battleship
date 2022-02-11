import {createShip, createGameboard } from './gameLogic.js'

// on website load, what do we want this thing to do! we want.... to create our boards (both front/back end) and
//link them up to each other :)
const cpu = createGameboard()
const human = createGameboard()
const shipNames = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer']
let shipName = '';
let humanTurn = false;

const turnDiv = document.querySelector('#whose-turn')
const startBtn = document.querySelector('#start-button')
const rotateBtn = document.querySelector('#rotate-button')
const shipGrid = document.querySelector('.ship-container')
startBtn.addEventListener('click', startGame)
rotateBtn.addEventListener('click', rotateShip)
let horizontalBoolean = true;

function startGame () {
  cpu.randomlyPlace();
  console.log(cpu)
  initiateComputerBoard();
  startBtn.classList.toggle('invisible')
  rotateBtn.classList.toggle('invisible')
  shipGrid.classList.toggle('invisible')
  toggleTurn()
  lockBoard(true)
}

function createBothGrids () {
  const humanGrid = document.querySelector('.grid-human')
  const cpuGrid = document.querySelector('.grid-computer')
  cpuGrid.classList.add('invisible')
  for (let i = 0; i < 100; i++) {
    let humanCell = document.createElement('div');
    let cpuCell = document.createElement('div');
    humanCell.id = `human-${i}`
    cpuCell.id = `cpu-${i}`
    //humanCell add Event Listener - on hover, show the
    humanCell.addEventListener('click', clickHumanBoard)
    humanGrid.appendChild(humanCell)
    cpuGrid.appendChild(cpuCell)

  }
}

function rotateShip () {
  horizontalBoolean = !horizontalBoolean;
  return;
}

function initiateComputerBoard () {
  const cpuGrid = document.querySelector('.grid-computer')
  const gridCells = cpuGrid.childNodes;
  cpuGrid.classList.toggle('invisible')
  gridCells.forEach((e) => {
    e.addEventListener('click', clickComputerBoard)
  })
};

function clickComputerBoard () {
  const coords = Number(this.id.slice(4))
  if(cpu.gameboard[coords] === -1 || cpu.gameboard[coords] === -2) {
    console.log('this has been fired upon already')
    return
  }
  console.log(this, cpu.gameboard[coords])
  if (cpu.gameboard[coords] === 1) {
    this.classList.add('ship')
    cpu.receiveAttack(coords)
    console.log(cpu.shipContainer)
    if (cpu.allSunk()) {
      editInfoContainer('You have won!')
      toggleTurn(true)
      lockBoard(false)
        //this will be converted to changing the h1 info area
    }
  } else {
    this.classList.add('not-ship')
    cpu.receiveAttack(coords)
  }
}

function editInfoContainer (words) {
  const infoDiv = document.querySelector('#info')
  infoDiv.innerText = words
}

function hoverHumanBoard () {
  //place ship at this div's spot??
  //mouseover and mouseout
  const shipNames = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer']
  const coords = Number(this.id.slice(6))

  //link board to human.gameboard state??



}

function clickHumanBoard () {
  const coords = Number(this.id.slice(6))
  if(human.placeShip(coords, horizontalBoolean, shipName) !== 'error') {
    human.placeShip(coords, horizontalBoolean, shipName)
    human.shipContainer[shipName].coordinates.forEach((e) => {
      let id = `#human-${e}`
      let div = document.querySelector(id)
      div.classList.add('human-ship')
    })
  } else {
    return;
  }
}

function toggleTurn (end) {
  if(end) {
    turnDiv.innerText = ''
    return
  }
  humanTurn = !humanTurn;
  if (humanTurn === true) {
    turnDiv.innerText = 'Your turn'
  } else {
    turnDiv.innerText = 'Computer turn'
  }
}



function placeHumanShip (coords, horizontalBoolean, shipName) {

}

function lockBoard(human) {
  if (human) {
    const humanGrid = document.querySelector('.grid-human')
    const gridCells = humanGrid.childNodes;
    gridCells.forEach((e) => {
      e.removeEventListener('click', clickHumanBoard)
    })

  } else {
    //lock computer board
    const cpuGrid = document.querySelector('.grid-computer')
    const gridCells = cpuGrid.childNodes;
    gridCells.forEach((e) => {
      e.removeEventListener('click', clickComputerBoard)
    })
  }
}

function onShipClick () {
  const ship = this.classList.item(0);
  shipName = ship;
  // output input constraints exceptions
  // ultimate output:
  //   the ship we have selected (id="shipname") is now an argument for placeShip()
  //   rotateboolean is also a argument
  //   final argument is coords, and that is going to be the currently hovered
}

function placeShipHoverIn () {
  //if(human.placeShip() == 'error')
  //   get the fudge outta here
  if (horizontalBoolean) {

  } else {

  }
}

function placeShipHoverOut () {

}

function placeShipClick () {

}

function gameOver () {
  //fireworks and lock up both boards, bring back button but it says restart game
}

function initiateShipContainer () {
  const ships = document.querySelector('.ship-container')
  ships.childNodes.forEach((e) => {
    e.addEventListener('click', onShipClick)
  })

}

createBothGrids();
initiateShipContainer();