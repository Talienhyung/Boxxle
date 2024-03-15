export class Player {
    positionX = 1;
    positionY = 1;

    
    deplacerHaut(grid, game) {
        if (game.detectSomethings(this.positionX, this.positionY, grid, "top", 0)) {
        grid[this.positionY][this.positionX] = 0;
        this.positionY--;
        grid[this.positionY][this.positionX] = 3;
        } else if (game.detectBoxPushable(this.positionX, this.positionY, grid, "top")){
            grid[this.positionY][this.positionX] = 0;
            this.positionY--;
            grid[this.positionY][this.positionX] = 3;
            grid[this.positionY-1][this.positionX] = 2;
        }
        return grid
    }

    deplacerBas(grid, game) {
        if (game.detectSomethings(this.positionX, this.positionY, grid, "bottom", 0)) {
            grid[this.positionY][this.positionX] = 0;
            this.positionY++;
            grid[this.positionY][this.positionX] = 3;
        }else if (game.detectBoxPushable(this.positionX, this.positionY, grid, "bottom")){
            grid[this.positionY][this.positionX] = 0;
            this.positionY++;
            grid[this.positionY][this.positionX] = 3;
            grid[this.positionY+1][this.positionX] = 2;
        }
        return grid
    }

    deplacerGauche(grid, game) {
        if (game.detectSomethings(this.positionX, this.positionY, grid, "left", 0)) {
            grid[this.positionY][this.positionX] = 0;
            this.positionX--;
            grid[this.positionY][this.positionX] = 3;
        }else if (game.detectBoxPushable(this.positionX, this.positionY, grid, "left")){
            grid[this.positionY][this.positionX] = 0;
            this.positionX--;
            grid[this.positionY][this.positionX] = 3;
            grid[this.positionY][this.positionX-1] = 2;
        }
        return grid
    }

    deplacerDroite(grid, game) {
        if (game.detectSomethings(this.positionX, this.positionY, grid, "right", 0)) {
            grid[this.positionY][this.positionX] = 0;
            this.positionX++;
            grid[this.positionY][this.positionX] = 3;
        }else if (game.detectBoxPushable(this.positionX, this.positionY, grid, "right")){
            grid[this.positionY][this.positionX] = 0;
            this.positionX++;
            grid[this.positionY][this.positionX] = 3;
            grid[this.positionY][this.positionX+1] = 2;
        }
        return grid
    }
}