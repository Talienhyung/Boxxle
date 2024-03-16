  //fetching Audios

// fetching Audios
let Music = new Audio("Background.mp3"); // For fetching BackgroundMusic
let playerMoveMusic = new Audio("playermove.mp3"); // For fetching BackgroundMusic


const backgroundaudio = () => {
 Music.play();
}

const playerMoveaudio = () => {
 playerMoveMusic.play();
}



export class Player {
  


    positionX = 1;
    positionY = 1;

    deplacement = 0

    constructor(grid){
        this.resetPos(grid)

    }
    
    goUp(grid, game) {
        backgroundaudio();


        this.deplacement++
        if (game.detectSomethings(this.positionX, this.positionY, grid, "top", 0)) {
        grid[this.positionY][this.positionX] = 0;
        this.positionY--;
        grid[this.positionY][this.positionX] = 3;
        playerMoveaudio();

        } else if (game.detectBoxPushable(this.positionX, this.positionY, grid, "top")){
            grid[this.positionY][this.positionX] = 0;
            this.positionY--;
            grid[this.positionY][this.positionX] = 3;
            grid[this.positionY-1][this.positionX] = 2;
            playerMoveaudio();

        }
        return game.baseOnBox(grid)
        

    }

    goDown(grid, game) {
        this.deplacement++
        if (game.detectSomethings(this.positionX, this.positionY, grid, "bottom", 0)) {
            grid[this.positionY][this.positionX] = 0;
            this.positionY++;
            grid[this.positionY][this.positionX] = 3;
            playerMoveaudio();

        }else if (game.detectBoxPushable(this.positionX, this.positionY, grid, "bottom")){
            grid[this.positionY][this.positionX] = 0;
            this.positionY++;
            grid[this.positionY][this.positionX] = 3;
            grid[this.positionY+1][this.positionX] = 2;
            playerMoveaudio();

        }
        return game.baseOnBox(grid)
    }

    goLeft(grid, game) {
        this.deplacement++
        if (game.detectSomethings(this.positionX, this.positionY, grid, "left", 0)) {
            grid[this.positionY][this.positionX] = 0;
            this.positionX--;
            grid[this.positionY][this.positionX] = 3;
            playerMoveaudio();

        }else if (game.detectBoxPushable(this.positionX, this.positionY, grid, "left")){
            grid[this.positionY][this.positionX] = 0;
            this.positionX--;
            grid[this.positionY][this.positionX] = 3;
            grid[this.positionY][this.positionX-1] = 2;
            playerMoveaudio();

        }
        return game.baseOnBox(grid)
    }

    goRight(grid, game) {
        this.deplacement++
        if (game.detectSomethings(this.positionX, this.positionY, grid, "right", 0)) {
            grid[this.positionY][this.positionX] = 0;
            this.positionX++;
            grid[this.positionY][this.positionX] = 3;
            playerMoveaudio();

        }else if (game.detectBoxPushable(this.positionX, this.positionY, grid, "right")){
            grid[this.positionY][this.positionX] = 0;
            this.positionX++;
            grid[this.positionY][this.positionX] = 3;
            grid[this.positionY][this.positionX+1] = 2;
            
        }
        return game.baseOnBox(grid)
    }

    resetPos(grid){
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j] === 3) {
                    this.positionX = j
                    this.positionY = i
                    return
                }
            }
        }
    }
}