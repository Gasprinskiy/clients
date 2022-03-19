class DataFilterer {
    separate({sourceArray, options}) {
        return sourceArray.slice(0 , options.limit * options.page)
    }

    search({sourceArray, method, options}){
        switch (method) {
            case 'byQuerry': return sourceArray.filter(item => item[options.searchBy.value] === options.searchQuerry)
            case 'byPack' : return sourceArray.filter(item => item.pack.value === options.filterPack.value)
            case 'full': 
            return sourceArray
            .filter(item => item[options.searchBy.value] === options.searchQuerry)
            .filter(item => item.pack.value === options.filterPack.value)
        }
    }

    
}

export const data = new DataFilterer()