﻿import Omi from '../../src/index.js';
import Item from './item.js'

Omi.tag('item',Item)

class List extends Omi.Component {
    constructor(data) {
        super(data);
    }

    render(){
        return `<div>
                    <item o-repeat="item in items" o-if="item.show" data-text="{{item.text}}"></item>
                </div>`
    }

}

Omi.render(new List({
    items: [
        { text: 'Omi', show: true },
        { text: 'dntzhang', show: true},
        { text: 'AlloyTeam'}
    ]
}),"body",true);