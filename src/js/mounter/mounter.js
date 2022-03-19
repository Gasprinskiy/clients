import { renderer } from '../core/renderer.js'
import { formTemplate, formInputs, fromOptions, searchBtn, searchForm } from '../components/clientForm.js'
import { clientList, listBtn } from '../components/clientList.js'

export const mount = async ({list, db, modalData, searchData, options}) => {
    mountSerachBar(searchData, options)
    mountDefaultModal(modalData, options.packs)
    mountCLientList(list, db)
}

export const mountCLientList = (list, db) => {
    renderer.render({
        selector:'.client-list', 
        template: '', 
    })
    if(list.length > 0) {
       list.forEach(element => {
            renderer.render({
                selector:'.client-list', 
                template: clientList(element), 
                isMultiple: true
            })
       }) 
    }
    if(list.length < db.length) {
        renderer.render({
            selector: '.client-list-btn',
            template: listBtn()
        })
    } else {
        renderer.render({
            selector: '.client-list-btn',
            template: ''
        })
    }
    
}

export const mountSerachBar = (data, options) => {
    Object.keys(data).forEach(key =>{
        if(key !== 'filterPack' && key !== 'searchBy') {
            renderer.render({selector: '.search-bar',template: searchForm(key)})
        } else {
            renderer.render({selector: '.search-bar',template: searchForm(key, 'select'), isMultiple: true})
        }
    })
    options.searchType.forEach(opt => {
        renderer.render({selector: 'select[data-searchkey="searchBy"]', template: fromOptions(opt), isMultiple: true})
    })
    renderer.render({selector: 'select[data-searchkey="searchBy"]', template: fromOptions(), isMultiple: true})
    options.packs.forEach(opt => {
        renderer.render({selector: 'select[data-searchkey="filterPack"]', template: fromOptions(opt), isMultiple: true})
    })
    renderer.render({selector: 'select[data-searchkey="filterPack"]', template: fromOptions(), isMultiple: true})
    renderer.render({selector: '.search-bar',template: searchBtn(),isMultiple: true})
}

export const mountDefaultModal = (data, options) => {
    renderer.render({
        selector:'.modal-container', 
        template: formTemplate()
    })
    Object.keys(data).forEach(key => {
        if(key !== 'pack'){
            renderer.render({selector:'.from-text-inputs', template: formInputs(key), isMultiple: true})
        } else {
            renderer.render({selector:'.form-select', template: formInputs(key, 'select')})
        }
    })
    options.forEach(opt => {
        renderer.render({selector:'.form-select select', template: fromOptions(opt), isMultiple: true})
    })
    renderer.render({selector:'.form-select select', template: fromOptions(), isMultiple: true})
}