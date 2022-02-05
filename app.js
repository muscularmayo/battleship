import {createShip, createGameboard } from './gameLogic.js'

// on website load, what do we want this thing to do! we want.... to create our boards (both front/back end) and
//link them up to each other :)

function startGame () {
  const cpu = gameLogic.createGameboard()
  const human = gameLogic.createGameboard()
  let humanTurn = true;
}

function createBothGrids () {
  const human = document.querySelector('.grid-human')
  const cpu = document.querySelector('.grid-computer')
  for (let i = 0; i < 100; i++) {
    let humanCell = document.createElement('div');
    let cpuCell = document.createElement('div');
    humanCell.id = `human-${i}`
    cpuCell.id = `cpu-${i}`
    human.appendChild(humanCell)
    cpu.appendChild(cpuCell)
  }
}

createBothGrids();