import { getEl, getCollection } from "../helpers/myHelpers.js";

class AppRenderer {
    render({selector, template, isMultiple = false, insertAdjacent = false}){
        if(insertAdjacent){
            return getEl(selector).insertAdjacentHTML('afterbegin', template)
        } else {
           switch(isMultiple){
                case true : return getEl(selector).innerHTML += template
                default: return getEl(selector).innerHTML = template
           } 
        }
        
    }

    find({selector, searchBy}){
        return [...getCollection(selector)].find(list => list.dataset[searchBy.val] === searchBy.id)
    }

    remove(selector) {
        selector.remove()
    }
}

export const renderer = new AppRenderer()