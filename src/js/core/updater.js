import { getCollection } from "../helpers/myHelpers.js"

class Updater {
    updateData({selectors, data}){
        getCollection(selectors).forEach(selector => {
            const keySet = selectors.split('-')[1].split(']')[0]
            const key = selector.dataset[keySet]
            selector.addEventListener('change', (e)=> {
                if(selector.type === 'select-one'){
                    const pack = e.target.value.split('|')
                    data[key].value = pack[0]
                    data[key].title = pack[1]
                } else {
                    data[key] = e.target.value.trim()
                }
            })
        })
        return data
    }

    updateSelector({selectors, data}){
        getCollection(selectors).forEach(selector => {
            const key = selector.dataset.key
            selector.value = data[key]
            if(selector.type === 'select-one'){
                const opts = [...selector.options]
                const optToselected = opts.find(opt => opt.text === data.pack.title)
                optToselected.selected = true
            }
        })
        return data
    }

    reset(selectors){
        getCollection(selectors).forEach(selector => {
            if(selector.dataset.key !== 'pack'){
                selector.value = ''
            } else {
                selector.options.selectedIndex = 0
            }
        })
    }
}

export const updater = new Updater()