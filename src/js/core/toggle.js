import { getEl } from "../helpers/myHelpers.js";

class Toggle {
    visibility({state, target, toggleClass}) {
        switch(state){
            case 'show': return getEl(target).classList.add(toggleClass)
            case 'hide': return getEl(target).classList.remove(toggleClass)
        }
    }
}

export const toggle = new Toggle()