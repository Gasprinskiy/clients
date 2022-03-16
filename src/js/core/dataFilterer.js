class DataFilterer {
    separate({sourceArray, options}) {
        return sourceArray.slice(0 , options.limit * options.page)
    }

    search({sourceArray, searchOptions}){
        let resultArray = []
        resultArray.push(this.commonSearch(sourceArray, searchOptions.querry))
        if(searchOptions.packFilter.length > 0){
            resultArray = resultArray.filter(item => item.pack.title === searchOptions.packFilter)
        }
        return resultArray
    }

    commonSearch(sourceArray, querry) {
       let foundItem = {}
       sourceArray.map(item => {
            Object.keys(item).forEach(key => {
                const values = JSON.stringify(item[key]).toLowerCase()
                if(values.includes(querry.toLowerCase())){
                    foundItem = item
                }
            })
       })
       return foundItem
    }
}

export const data = new DataFilterer()