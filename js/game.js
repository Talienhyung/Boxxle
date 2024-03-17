import { Levels } from "./level.js";

export class Game {
    
    actualLevel = 0
    listBase = []

    cloneGrid = []

    endLevel = false
    errorBase = false
    ok=false
    

    constructor(){
        this.gridOrigin = Levels[this.actualLevel]
        this.cloneGrid = this.deepClone(Levels[this.actualLevel])
        this.listBase = this.findBase()
        if(this.listBase.length===0){
            this.nextLevel()
        }
    }
    
    // detect if an object {type} is at the direct {direction} from {posX} {posY} in the {grid}
    detectSomethings (posX, posY, grid, direction, type){
        const numCols = grid[0].length;
        const numRows = grid.length;

        switch (direction) {
            case "top":
                if(posY-1 >=0){
                    if (type === 0){
                        return grid[posY-1][posX] === type || grid[posY-1][posX] === 4
                    }
                    return grid[posY-1][posX] === type
                }
                break
            case "bottom":
                if(posY+1 <numRows){
                    if (type === 0){
                        return grid[posY+1][posX] === type || grid[posY+1][posX] === 4
                    }
                    return grid[posY+1][posX] === type
                }
                break
            case "left":
                if(posX-1 >=0){
                    if (type === 0){
                        return grid[posY][posX-1] === type || grid[posY][posX-1] === 4
                    }
                    return grid[posY][posX-1] === type
                }
                break
            case "right":
                if(posX+1 <numCols){
                    if (type === 0){
                        return grid[posY][posX+1] === type || grid[posY][posX+1] === 4
                    }
                    return grid[posY][posX+1] === type
                }
                break
            default:
                return false
        }
        return false
    }

    // Detect if there is the space for pushing the box
    detectBoxPushable(posX, posY, grid, direction) {
        if (this.detectSomethings(posX, posY, grid, direction, 2)){
            switch (direction){
                case "top":
                    return this.detectSomethings(posX, posY-1, grid, direction, 0)
                case "bottom" :
                    return this.detectSomethings(posX, posY+1, grid, direction, 0)
                case "left" :
                    return this.detectSomethings(posX-1, posY, grid, direction, 0)
                case "right" :
                    return this.detectSomethings(posX+1, posY, grid, direction, 0)
            }
        }
    }

    // find all the base and return it in a array
    findBase(){
        let listBase = [];
        for (let i = 0; i < this.gridOrigin.length; i++) {
            for (let j = 0; j < this.gridOrigin[i].length; j++) {
                if (this.gridOrigin[i][j] === 4) {
                    listBase.push([i, j]);
                }
            }
        }
        return listBase;
    }

    // return true if there is a base at {posX} {posY}
    boxOnBase(posX, posY){
        for (let i = 0; i < this.listBase.length; i++) {
            let base=this.listBase[i]
            if(base[0] === posY && base[1] === posX){
                return true
            }
        }
        return false
    }

    // return the correct grid if some base are missing
    baseOnBox(grid){
        for (let i = 0; i < this.listBase.length; i++) {
            let base=this.listBase[i]
            if(grid[base[0]][base[1]] === 0){
                grid[base[0]][base[1]] = 4
            }
        }
        return grid
    }

    // return true if all the base are fill
    noMoreBaseToFill(grid){
        for (let i = 0; i < this.listBase.length; i++) {
            let base=this.listBase[i]
            if(grid[base[0]][base[1]] != 2){
                return false
            }
        }
        return true
    }
    
    // create a deepclone
    deepClone(array) {
        return JSON.parse(JSON.stringify(array));
    }

    playAudio(url) {
        var audio = new Audio(url);
        
        audio.play();
    }

    // display the win message
    win(){
        let winContainer = document.querySelector("#winContainer"); // To show Username

        let winMsg = document.querySelector("#win"); // To show Username

        winMsg.innerText = "Hurrah!!! You Have won";
        winContainer.style.display = "block";
        winMsg.style.display = "block";
        winMsg.style.width = 600 + "px";
        setTimeout(() =>{
            winContainer.style.display = "none";
            winMsg.style.display = "none";
            winMsg.style.width = 0 + "px";
            winMsg.style.height = 0 + "px";
        }, 5000);
   }
   
   // pass to the next level
    nextLevel(){
        this.actualLevel++
        if (this.actualLevel === Levels.length){
            this.endLevel = true
            return
        }
        this.gridOrigin = Levels[this.actualLevel]
        this.win()
        this.listBase = this.findBase()
        this.cloneGrid = this.deepClone(Levels[this.actualLevel])
        if(this.listBase.length===0){
            this.nextLevel()
            this.errorBase = true
        }
    }
}
