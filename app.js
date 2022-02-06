import {createShip, createGameboard } from './gameLogic.js'

// on website load, what do we want this thing to do! we want.... to create our boards (both front/back end) and
//link them up to each other :)
const cpu = createGameboard()
function startGame () {
  const human = createGameboard()
  cpu.randomlyPlace();
  let humanTurn = true;
  console.log(cpu)
}

function createBothGrids () {
  const human = document.querySelector('.grid-human')
  const cpuGrid = document.querySelector('.grid-computer')
  for (let i = 0; i < 100; i++) {
    let humanCell = document.createElement('div');
    let cpuCell = document.createElement('div');
    humanCell.id = `human-${i}`
    cpuCell.id = `cpu-${i}`
    cpuCell.addEventListener('click', clickComputerBoard)
    human.appendChild(humanCell)
    cpuGrid.appendChild(cpuCell)

  }
}

function clickComputerBoard (e) {
  const id = Number(this.id.slice(4))
  if(cpu.gameboard[id] === -1 || cpu.gameboard[id] === -2) {
    console.log('this has been fired upon already')
    return
  }
  console.log(this, cpu.gameboard[id])
  if (cpu.gameboard[id] === 1) {
    this.classList.add('ship')
    cpu.receiveAttack(id)
    console.log(cpu.shipContainer)
    if (cpu.allSunk()) {
      alert('you win!')
      //this will be converted to changing the h1 info area
    }
  } else {
    this.classList.add('not-ship')
    cpu.receiveAttack(id)
  }
}

function editInfoContainer (shipName) {
  if(shipName) {

  }
}

startGame();
createBothGrids();