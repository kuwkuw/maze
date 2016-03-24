var maze = [
    [-1,1,1,1,1,1,0,0,0,1],
    [0,1,0,0,0,0,0,0,0,1],
    [0,0,1,1,0,0,0,0,0,1],
    [0,0,0,1,0,0,0,0,0,1],
    [0,0,0,1,0,0,0,0,0,3],
    [0,0,0,1,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,1],
    [0,0,0,1,0,0,0,0,0,1],
    [0,0,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1]
];

var mazeWithOutExit = [
    [-1,1,1,1,1,1,0,0,0,1],
    [0,1,0,0,0,0,0,0,0,1],
    [0,0,1,1,0,0,0,0,0,1],
    [0,0,0,1,0,0,0,0,0,1],
    [0,0,0,1,0,0,0,0,0,1],
    [0,0,0,1,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,1],
    [0,0,0,1,0,0,0,0,0,1],
    [0,0,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1]
];

var CreateMoqRootElement = function(){
    var rootElement = document.createElement('div');
    var mazeElement = document.createElement('div');
    mazeElement.setAttribute('data-component', 'maze');
    var mazeControlsEelement = document.createElement('div');
    mazeControlsEelement.setAttribute('data-component', 'maze-controls');
    rootElement.appendChild(mazeControlsEelement);
    rootElement.appendChild(mazeElement);
    return rootElement;
};

var cloneArray = function(array){
    var clone = [];
    array.forEach(function(item){
        clone.push(item.slice());
    });
    return clone;
};

describe('Rendering DOM', function() {
    var rootElement = CreateMoqRootElement();
    var page = new Page({el:rootElement});
    var maze = page._mazeComponent;
    var mazeControls = page._controlesComponent;

    describe('Rendering maze controls DOM elements', function(){
        it('Render button "Clear" element', function(){
            expect(mazeControls._el.querySelector('[data-selector="clear"]')).to.not.be.null;
        });

        it('Render button "Depth-First search" element', function(){
            expect(mazeControls._el.querySelector('[data-selector="depth-search"]')).to.not.be.null;
        });
        it('Render button "Breadth-First search" element', function(){
            expect(mazeControls._el.querySelector('[data-selector="breadth-search"]')).to.not.be.null;
        });
    });

    describe("Rendering maze DOM elemets", function(){
        it("Render all maze cells", function(){
            assert.equal(maze._el.querySelectorAll('.maze-cell').length, 10*10);
        });
    });
});

describe('Controle events tests', function(){
    var rootElement = CreateMoqRootElement();
    //var page = new Page({el:rootElement});
    var event = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
    });

    it('Click on "Depth search"', function(){
        rootElement.querySelector('[data-selector="depth-search"]').dispatchEvent(event);
        var mazeWithPathCells;
        setTimeout(function(){
            mazeWithPathCells = rootElement.querySelectorAll('.path').length;
            expect(mazeWithPathCells).to.not.eql(0);
        }, 3000);
    });

    it('Click on "Clear"', function(){
        rootElement.querySelector('[data-selector="clear"]').dispatchEvent(event);
        var mazeWithPathCells = rootElement.querySelectorAll('._path').length;
        expect(mazeWithPathCells).to.eql(0);
    });
});

describe('Search test', function(){
    var search = new Search();
    describe('depthsFirstSearchPathInMaze() test', function(){

        var path = search.depthsFirstSearchPathInMaze(0,0, cloneArray(maze));
        it('Path length more then 0', function(){
            expect(path).to.be.array;
            expect(path.length).to.not.eql(0);
        });

        it('Maze without exit', function(){
            var noPath = search.depthsFirstSearchPathInMaze(0,0, cloneArray(mazeWithOutExit));
            expect(noPath).to.be.array;
            expect(noPath.length).to.eql(0);
        });

        it('Path length is 56', function(){
            expect(path.length).to.eql(56);
        });
    });

    describe('breadthFirstSearchPathInMaze test', function(){
        var path = search.breadthFirstSearchPathInMaze(0,0, cloneArray(maze));
        it('Maze have exit', function(){
            expect(path).to.be.array;
        });

        it('Maze without exit', function(){
            var noPath = search.breadthFirstSearchPathInMaze(0,0, cloneArray(mazeWithOutExit));
            expect(noPath).to.be.array;
            expect(noPath.length).to.eql(0);
        });

        it('Path length is 16', function(){
            expect(path.length).to.eql(16);
        });
    });
});




