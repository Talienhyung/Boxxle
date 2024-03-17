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

    boxOnBase(posX, posY){
        for (let i = 0; i < this.listBase.length; i++) {
            let base=this.listBase[i]
            if(base[0] === posY && base[1] === posX){
                return true
            }
        }
        return false
    }

    baseOnBox(grid){
        for (let i = 0; i < this.listBase.length; i++) {
            let base=this.listBase[i]
            if(grid[base[0]][base[1]] === 0){
                grid[base[0]][base[1]] = 4
            }
        }
        return grid
    }

    noMoreBaseToFill(grid){
        for (let i = 0; i < this.listBase.length; i++) {
            let base=this.listBase[i]
            if(grid[base[0]][base[1]] != 2){
                return false
            }
        }
        return true
    }

    nextLevel(){
        this.actualLevel++
        if (this.actualLevel === Levels.length){
            this.endLevel = true
            return
        }
        this.gridOrigin = Levels[this.actualLevel]
        this.listBase = this.findBase()
        this.cloneGrid = this.deepClone(Levels[this.actualLevel])
        if(this.listBase.length===0){
            this.nextLevel()
        }
    }
    
    deepClone(array) {
        return JSON.parse(JSON.stringify(array));
    }

    playAudio(url) {
        var audio = new Audio(url);
        
        audio.play();
    }
}
