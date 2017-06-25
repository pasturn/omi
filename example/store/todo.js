﻿import Omi from '../../src/index.js';
import List from './list.js';


Omi.tag('list', List);

class Todo extends Omi.Component {
    constructor(data) {
        super(data)
    }

    installed(){
        this.$store.addSelfView(this.list)
        this.$store.addSelfView(this)
    }

    beforeRender(){
        this.data.length = this.$store.data.items.length
    }

    add (evt){
        evt.preventDefault()
        let value = this.data.text
        this.data.text = ''
        this.$store.add(value)
    }

    style () {
        return `
        h3 { color:red; }
        button{ color:green;}
        `;
    }

    clear(){
        this.data.text = ''
        this.$store.clear()
    }

    handleChange(evt){
        this.data.text = evt.target.value
    }

    render () {
        return `<div>
                    <h3>TODO</h3>
                    <button onclick="clear">Clear</button>
                    <list  name="list" ::data-items="$store.data.items"  ></list>
                    <form onsubmit="add" >
                        <input type="text" onchange="handleChange"  value="{{text}}"  />
                        <button>Add #{{length}}</button>
                    </form>
                </div>`;
    }
}

export default Todo;
