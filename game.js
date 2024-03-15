import { Levels } from "./level.js";

export class Game {
    
    actualLevel = 0
    listBase = []
    

    constructor(){
        this.gridOrigin = Levels[this.actualLevel]
        this.listBase = this.findBase
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
}
