import { Game } from "./game.js";
import { Player } from "./player.js";

let game = new Game(0);
let player = new Player(0);


let grid = game.gridOrigin


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
    requestAnimationFrame(() => draw(grid, gridContainer))
}


const gridContainer = document.getElementById('gameboard');

// Draw initial grid
draw(grid, gridContainer);


// Fonction principale pour gérer les touches pressées
function gestionTouches(event) {
    const touche = event.key.toLowerCase();
    switch (touche) {
        case 'z':
            grid = player.deplacerHaut(grid, game);
            break;
        case 's':
            grid = player.deplacerBas(grid, game);
            break;
        case 'q':
            grid = player.deplacerGauche(grid, game);
            break;
        case 'd':
            grid = player.deplacerDroite(grid, game);
            break;
        default:
            break;
    }
}

// Ajout d'un écouteur d'événements pour les touches du clavier
document.addEventListener('keydown', gestionTouches);

