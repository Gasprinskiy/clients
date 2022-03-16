class LStorage {
    get({key, defaultVal}){
        if(localStorage.getItem(key)){
            const data = localStorage.getItem(key)
            return JSON.parse(data)
        }
        return defaultVal
    }

    set({key, value}){
        const data = JSON.stringify(value)
        return localStorage.setItem(key, data)
    }
}

export const storage = new LStorage()
