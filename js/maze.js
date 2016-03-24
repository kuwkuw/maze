'use strict';
//maze element equal '-1' is start point of maze
//element equal '1' is wall of maze
//element equal '3' is finish of maze
class Maze{
    constructor(options){
        this._el = options.el.querySelector('[data-component="maze"]');
        this._maze = [
            [-1,1,1,1,1,1,0,0,0,1],
            [0,1,0,0,0,0,0,0,0,1],
            [0,0,1,1,0,0,0,0,0,1],
            [0,0,0,1,0,0,0,0,0,1],
            [0,0,0,1,0,0,0,0,0,1],
            [0,0,0,1,0,0,0,0,0,1],
            [0,0,0,0,0,0,0,0,0,1],
            [0,0,0,1,0,0,0,0,0,3],
            [0,0,0,1,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1]
        ];

        this._render();
    }

    renderPathInMaze(path){
        let _this = this;
        let counter = 0;
        this.intervalId = setInterval(()=>{
            if(path.length==counter){
                clearInterval(_this.intervalId);
                return;
            }
            var mazeElement = _this._el.querySelector('[data-cell-index="'+path[counter][0]+path[counter][1]+'"]');
            mazeElement.classList.add('path');
            counter++;
        }, 200);

    }

    clear(){
        clearInterval(this.intervalId);
        this._el.innerHTML = '';
        this._render();
    }

    _render(){
        for(let mazeRowIndex = 0; mazeRowIndex < this._maze.length; mazeRowIndex++ ){
            for(let mazeColumnIndex = 0; mazeColumnIndex < this._maze.length; mazeColumnIndex++){
                this._el.appendChild(this._createMazeCell(mazeRowIndex, mazeColumnIndex));
            }
        }
    }

    _createMazeCell(mazeRowIndex, mazeColumnIndex){
        let cell = document.createElement('span');
        //cell.setAttribute('data-row-index', mazeRowIndex);
        cell.setAttribute('data-cell-index', ''+mazeRowIndex+mazeColumnIndex);

        if(this._maze[mazeRowIndex][mazeColumnIndex]===1){
            cell.setAttribute('class', 'maze-cell maze-cell-wall');
        }else if(this._maze[mazeRowIndex][mazeColumnIndex]===3){
            cell.setAttribute('class', 'maze-cell maze-cell-exit');
        }else if(this._maze[mazeRowIndex][mazeColumnIndex]===-1){
            cell.setAttribute('class', 'maze-cell maze-cell-start');
        }else {
            cell.setAttribute('class', 'maze-cell');
        }
        return cell;
    }

    getMaze(){
        var clone = [];
        this._maze.forEach((item)=>{
            clone.push(item.slice());
        });
        return clone;
    }


}