import {createShip, createGameboard } from './gameLogic.js'

// on website load, what do we want this thing to do! we want.... to create our boards (both front/back end) and
//link them up to each other :)
const cpu = createGameboard()
const human = createGameboard()
const startBtn = document.querySelector('#start-button')
const rotateBtn = document.querySelector('#rotate-button')
startBtn.addEventListener('click', startGame)
rotateBtn.addEventListener('click', rotateShip)
let horizontalBoolean = true;

function startGame () {
  cpu.randomlyPlace();
  let humanTurn = true;
  console.log(cpu)
  initiateComputerBoard();
  startBtn.classList.toggle('invisible')
  rotateBtn.classList.toggle('invisible')
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
      editInfoContainer('You have won!')
        //this will be converted to changing the h1 info area
    }
  } else {
    this.classList.add('not-ship')
    cpu.receiveAttack(id)
  }
}

function editInfoContainer (words) {
  const infoDiv = document.querySelector('#info')
  infoDiv.innerText = words
}

createBothGrids();
