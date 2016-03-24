'use strict'

class Search{
    constructor(){
        this._maze = [];
        this._path = [];
    }

    depthsFirstSearchPathInMaze(mazeRowIndex, mazeColumnIndex, mazeArray){
        this._maze = this._convertMazeArrayToMazeModel(mazeArray);
        this._path = [];
        if(this._dfs(mazeRowIndex, mazeColumnIndex, 0)){
            return this._path.reverse();
        }
        return [];
    }

    breadthFirstSearchPathInMaze(mazeRowIndex, mazeColumnIndex, mazeArray){
        this._maze = this._convertMazeArrayToMazeModel(mazeArray);
        this._path = [];
        let queue = [];
        let startCell = this._maze[mazeRowIndex][mazeColumnIndex];
        startCell.row = mazeRowIndex;
        startCell.column = mazeColumnIndex;
        queue.push(startCell);
        let exitCell;
        while(queue.length>0){
            let cell = queue.shift();

            cell.isVisited = true;

            if(cell.isExit){
                exitCell = cell;
                break;
            }

            let rowShifts    = [-1,1,0,0];
            let columnShifts = [0,0,-1,1];

            for(let shift = 0; shift < 4; shift++){
                if(this._check(cell.row + rowShifts[shift], cell.column + columnShifts[shift])){
                    let nextCell = this._maze[cell.row + rowShifts[shift]][cell.column + columnShifts[shift]];
                    nextCell.row = cell.row + rowShifts[shift];
                    nextCell.column = cell.column + columnShifts[shift];
                    nextCell.parent = cell;
                    queue.push(nextCell);
                }
            }
        }//while

        return this._getShortPath(exitCell);
    }

    _getShortPath(exitCell){
        if(!exitCell){
           return [];
        }
        let currentCell = exitCell.parent;
        let path = [];
        while(!!currentCell.parent){
            path.push([currentCell.row, currentCell.column]);
            currentCell = currentCell.parent;
        }
        return path.reverse();
    }

    _dfs(mazeRowIndex, mazeColumnIndex, cellPrice){
        if(this._maze[mazeRowIndex][mazeColumnIndex].isExit){
            //this._path.push([mazeRowIndex,mazeColumnIndex]);
            return true;
        }
        //Cell is checked
        cellPrice++;
        this._maze[mazeRowIndex][mazeColumnIndex].isVisited =  true;

        let rowShifts    = [-1,1,0,0];
        let columnShifts = [0,0,-1,1];
        let shift = 0;
        let searchResult = false;

        while(shift<4 && !searchResult){
            if(this._check(mazeRowIndex + rowShifts[shift] ,mazeColumnIndex + columnShifts[shift])){
                searchResult = this._dfs(mazeRowIndex + rowShifts[shift] ,mazeColumnIndex + columnShifts[shift]);
                if(searchResult && !this._maze[mazeRowIndex][mazeColumnIndex].isStart){
                    this._path.push([mazeRowIndex,mazeColumnIndex]);
                    this._maze[mazeRowIndex][mazeColumnIndex].cellPrice = cellPrice;
                    return true;
                }
            }
            shift++;
        }

        return searchResult;
    }

    _check(mazeRowIndex, mazeColumnIndex){
        return (mazeRowIndex >= 0 && mazeRowIndex < this._maze.length) &&
                (mazeColumnIndex >= 0 &&  mazeColumnIndex < this._maze.length) &&
                !this._maze[mazeRowIndex][mazeColumnIndex].isWall &&
                !this._maze[mazeRowIndex][mazeColumnIndex].isVisited;
    }

    _convertMazeArrayToMazeModel(mazeArray){
        var maze = [];
        mazeArray.forEach((itemRow)=>{
            var row = [];
            itemRow.forEach((itemColumn)=>{
                row.push({
                    isWall: itemColumn === 1,
                    isStart: itemColumn === -1,
                    isExit: itemColumn === 3
                });
            });
            maze.push(row);
        });
        return maze;
    }
}