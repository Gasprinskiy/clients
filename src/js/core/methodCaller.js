import { getCollection } from "../helpers/myHelpers.js";

class MethodCaller {
    static callers = '[data-method]' 

    call({methods, parrent = ''}) {
        const hasParent = (parrent !== '')
        let selector = ''
        if(hasParent){
            selector = `${parrent} ${MethodCaller.callers}`
        } else {
            selector = MethodCaller.callers
        }
        getCollection(selector).forEach(caller => {
            caller.addEventListener('click', (e)=> {
                const callerMethod = e.target.dataset.method
                methods[callerMethod](e.target)
            })
        })
    }

}

export const methodCaller = new MethodCaller()