export const createId = () => {
    const words  = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    let result = '';
    for(let i = 0; i < 5; i++) {
        result += words.charAt(Math.floor(Math.random() * words.length));
    }
    return result
}

export const getEl = (el) => {
    return document.querySelector(el)
}

export const getCollection = (el) => {
    return document.querySelectorAll(el)
}

export const toggleWithTimeOut = (selector, togglingClass, timeout) => {
    selector.classList.add(togglingClass);
    setTimeout(()=>{
        return selector.classList.remove(togglingClass);
    }, timeout)
}

export const returnFirstChild = (selector) => {
    return getEl(selector).children[0]; 
}