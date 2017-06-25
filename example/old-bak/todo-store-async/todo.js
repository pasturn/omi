﻿import Omi from '../../src/index.js';
import List from './list.js';

Omi.makeHTML('List', List);

class Todo extends Omi.Component {
    constructor(data) {
        super(data)
    }

    install(){
        this.$store.addView(this)
    }

    installed(){
        this.$store.ready(()=>this.$store.update())
    }

    beforeRender(){
        this.data.length = this.$store.data.items.length
    }

    add (evt) {
        evt.preventDefault()
        if(!this.$store.isReady){
            return
        }
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

    handleChange(evt){
        this.data.text = evt.target.value
    }

    render () {
        return `<div>
                    <h3>TODO</h3>
                    <List  name="list" data="$store.data"  />
                    <form onsubmit="add" >
                        <input type="text" onchange="handleChange"  value="{{text}}"  />
                        <button>Add #{{length}}</button>
                    </form>
                </div>`;
    }
}

export default Todo;
