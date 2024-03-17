import { Game } from "./game.js";
import { Player } from "./player.js";
import { Settings } from "./settings.js";
import { RestartTimer } from "./timer.js";

let userName = document.querySelector("#userInput"); // For fetching username
let showUserName = document.querySelector("#showUsername"); // To show Username
let saveBtn = document.querySelector("#save"); // For fetching save button
let para = document.querySelector("#para"); // For fetching save paragraph
let user = document.querySelector("#username"); // For fetching save paragraph

let miror = false
//when i will click save button player name will show and input field will disappear

saveBtn.addEventListener("click" , () => {
  if(userName.value == ""){
    error.innerText = "Please enter your name";
    para.style.display = "block";
  
  }else{
    showUserName.innerText = userName.value;
    para.style.display = "block";
    user.style.display = "none";
  }
  
})

export function  ChangeSettings(key, keyEvent) {
  switch (key) {
    case 1:
        settings.up =keyEvent
        break;
    case 2:
        settings.down=keyEvent
        break;
    case 3:
        settings.left=keyEvent
        break;
    case 4:
        settings.right=keyEvent
        break;
    default:
        break;
  }
}

let hadRestart =false
let copi = 0
let game = new Game(0);
let grid = game.gridOrigin
let player = new Player(grid);
let settings = new Settings(0);

const container = document.getElementById('gameboard');
const resetButton = document.getElementById('reset-btnn');
const depText = document.getElementById('movement');
const winText = document.getElementById('win');

const draw = () => {
    // Clear previous cells
    if(player.movement !=0){
      copi= game.deepClone(player.movement)
    }
    depText.textContent = player.movement
    winText.textContent = "Hooray!!! You've won in "+copi+" moves"
    container.innerHTML = '';
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        if (grid[i][j] === 1) {
          cell.classList.add('wall');
        } else if (grid[i][j] === 2) {
          cell.classList.add('box');
          if(game.boxOnBase(j, i)){
            cell.classList.add('onBase')
          }
        } else if (grid[i][j] === 3) {
          if(player.movement===0){
            cell.classList.add('notMouving');
            if(!hadRestart){
              RestartTimer()
            }
          } else if(miror){
            cell.classList.add('back');
          }
          cell.classList.add('player');
        } else if (grid[i][j] === 4) {
          cell.classList.add('target');
        }
        container.appendChild(cell);
      }
    }

    // Call draw recursively using requestAnimationFrame
    requestAnimationFrame(() => {
        if(game.noMoreBaseToFill(grid)){
            game.nextLevel()
            if(game.endLevel){
                window.location.href = "./page/win.html"
            }
            game.playAudio("sound/Jingle_Win_00.mp3")
            grid = game.gridOrigin
            player.resetPos(grid)
            hadRestart = false
        }
        draw()
    })
}


// Draw initial grid
draw();

// Main function for managing pressed keys
function managementKeys(event) {
    const touche = event.key.toLowerCase();
    switch (touche) {
        case settings.up:
            grid = player.goUp(grid, game);
            break;
        case settings.down:
            grid = player.goDown(grid, game);
            break;
        case settings.left:
            miror = true
            grid = player.goLeft(grid, game);
            break;
        case settings.right:
            miror = false
            grid = player.goRight(grid, game);
            break;
        default:
            break;
    }
}

const resetLevel = () => {
    grid = game.deepClone(game.cloneGrid)
    player.resetPos(grid)
    hadRestart = true
}

// Add an event listener for keyboard keys
document.addEventListener('keydown', managementKeys);
resetButton.addEventListener('click', resetLevel);

