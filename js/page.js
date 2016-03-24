'use strict';

class Page{
    constructor(options){
        this._el = options.el;

        this._controlesComponent = new PageControlse({
            el: this._el
        });

        this._mazeComponent = new Maze({
            el: this._el
        });

        this._search = new Search();

        this._controlesComponent.onDepthSearchClick(this._onDepthSearchClick.bind(this));
        this._controlesComponent.onClearClick(this._onClearClick.bind(this));
        this._controlesComponent.onBreadthSearchClick(this._onBreadthSearchClick.bind(this));
    }

    _onDepthSearchClick(){
        this._mazeComponent.clear();
        let path = this._search.depthsFirstSearchPathInMaze(0,0, this._mazeComponent.getMaze());
        this._mazeComponent.renderPathInMaze(path);
    }

    _onBreadthSearchClick(){
        this._mazeComponent.clear();
        let path = this._search.breadthFirstSearchPathInMaze(0,0, this._mazeComponent.getMaze());
        this._mazeComponent.renderPathInMaze(path);
    }

    _onClearClick(){
        this._mazeComponent.clear();
    }
}
