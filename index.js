import { Game } from "./game.js";
import { Player } from "./player.js";
import { Settings } from "./settings.js";
let userName = document.querySelector("#userInput"); // For fetching username
let showUserName = document.querySelector("#showUsername"); // To show Username
let saveBtn = document.querySelector("#save"); // For fetching save button
let para = document.querySelector("#para"); // For fetching save paragraph
let user = document.querySelector("#username"); // For fetching save paragraph


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


let game = new Game(0);
let grid = game.gridOrigin
let player = new Player(grid);
let settings = new Settings(0);

const container = document.getElementById('gameboard');

const draw = (grid) => {
    // Clear previous cells
    container.innerHTML = '';
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        if (grid[i][j] === 1) {
          cell.classList.add('wall');
        } else if (grid[i][j] === 2) {
          cell.classList.add('box');
        } else if (grid[i][j] === 3) {
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
            grid = game.gridOrigin
            player.resetPos(grid)
            console.log(player.positionX)
            console.log(player.positionY)
            console.log(grid)
        }
        draw(grid, gridContainer)
    })
}



const gridContainer = document.getElementById('gameboard');

// Draw initial grid
draw(grid, gridContainer);


// Fonction principale pour gérer les touches pressées
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
            grid = player.goLeft(grid, game);
            break;
        case settings.right:
            grid = player.goRight(grid, game);
            break;
        default:
            break;
    }
}

// Ajout d'un écouteur d'événements pour les touches du clavier
document.addEventListener('keydown', managementKeys);

