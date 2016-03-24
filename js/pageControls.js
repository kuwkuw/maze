'use strict';

class PageControlse{
    constructor(options){
        this._el = options.el.querySelector('[data-component="maze-controls"]');

        this._render();

        this._el.addEventListener('click', this._inputIsClicked.bind(this));
    }

    onDepthSearchClick(hendler){
        this._el.addEventListener('depthSearchClick', hendler);
    }

    onClearClick(hendler){
        this._el.addEventListener('clearClick', hendler);
    }

    onBreadthSearchClick(hendler){
        this._el.addEventListener('breadthSearchClick', hendler);
    }

    _render(){
        this._el.appendChild(this._createInputBtn('clear', 'Clear'));
        this._el.appendChild(this._createInputBtn('depth-search', 'Depth-First search'));
        this._el.appendChild(this._createInputBtn('breadth-search', 'Breadth-First search'));
    }

    _createInputBtn(selectorName, name){
        let input = document.createElement('input');
        input.setAttribute('data-selector', selectorName);
        input.setAttribute('type', 'button');
        input.value = name;
        return input;
    }

    _inputIsClicked(e){
        let target = e.target;
        let event;

        if(target.closest('[data-selector="depth-search"]')){
            event = new CustomEvent('depthSearchClick', { 'detail': 'click' });
        }

        if(target.closest('[data-selector="clear"]')){
            event = new CustomEvent('clearClick', { 'detail': 'click' });
        }

        if(target.closest('[data-selector="breadth-search"]')){
            event = new CustomEvent('breadthSearchClick', { 'detail': 'click' });
        }

        this._el.dispatchEvent(event);
    }
}