import { updater } from './core/updater.js';
import { client } from './core/clientFactory.js'
import { storage } from './core/storage.js'
import { renderer } from './core/renderer.js'
import { toggle } from './core/toggle.js';
import { toggleWithTimeOut, returnFirstChild } from './helpers/myHelpers.js';
import { mount, mountDefaultModal, mountCLientList } from './app/mounter.js';
import { methodCaller } from './core/methodCaller.js'
import { clientList, listInner } from './components/clientList.js';
import { redactBtns , paymetRedactor } from './components/clientForm.js'
import { data } from './core/dataFilterer.js';
import validator from 'validator';


const packs = client.createPacksArray();
const listKey = 'Client-List'
let clientsDb = [];
let userList = [];
let searchResults = []
let userInfo = {
    name: '',
    surname: '',
    phone: '',
    pack: {
        value: '',
        title: ''
    }
}
let searchData = {
    searchQuerry: '',
    filterPack: {
        value: '',
        title: ''
    }
}
const loadOptions = {
    page: 1,
    limit: 10,
    isInSearch: false
}
let oldVal = ''
const defaultUserInfo = JSON.stringify(userInfo)


window.addEventListener('DOMContentLoaded', ()=> {
    clientsDb = storage.get({key: listKey, defaultVal: clientsDb})
    userList = data.separate({sourceArray: clientsDb, options: loadOptions})
    mount({
        list: userList, 
        db: clientsDb,
        modalData: userInfo,
        searchData: searchData,
        options: packs
    })
    .then(()=>{
        methodCaller.call({methods: methods})
        searchData = updater.updateData({selectors: '.input[data-searchkey]', data: searchData})
    })  
})

const methods = {
    openCreateModal(){
        renderer.render({selector: '.modal-container', template: ''})
        mountDefaultModal(userInfo, packs)
        userInfo = updater.updateData({selectors: '.input[data-key]', data: userInfo})
        methodCaller.call({methods: methods, parrent: '.modal-container'})
        this.openModal()
    },

    openRedactModal(target){
       const client = userList.find(list => list.id === target.dataset.client);
       oldVal = JSON.stringify(client)
       userInfo = updater.updateSelector({selectors:'.input[data-key]', data: client})
       userInfo = updater.updateData({selectors: '.input[data-key]', data: userInfo})
       renderer.render({selector: '.form-btns', template: redactBtns(client.id)})
       renderer.render({selector: '.from-additional-info', template: paymetRedactor(client)})
       methodCaller.call({methods: methods, parrent: '.client-form-column'})
       this.openModal()
    },

    createUser(){
        if(this.validateForm(userInfo) === true){
            const newUser = client.create(userInfo)
            renderer.render({selector: '.form-error', template: ''})
            methodCaller.call({methods: methods, parrent: '.client-list'})
            clientsDb.unshift(newUser)
            this.setData()
                .then(()=> {
                    this.closeModal()
                    this.getData()
                        .then(()=> {
                            mountCLientList(userList, clientsDb)
                            toggleWithTimeOut(returnFirstChild('.client-list'), 'accent', 500)
                        })
                })
        } else {
            renderer.render({selector: '.form-error', template: this.validateForm(userInfo)})
        }
    },

    removeUser(target){
        this.closeModal()

        const cleintId = target.dataset.client
        const removedElem = renderer.find({
            selector:'.client-list [data-client]', 
            searchBy: {val: 'client', id: cleintId}
        })
        clientsDb = client.remove({id: cleintId, list: clientsDb});
        this.setData()
            .then(()=>{
                this.getData()
                    .then(()=>{
                        renderer.remove(removedElem)
                        mountCLientList(userList, clientsDb)
                        methodCaller.call({methods: methods, parrent: '.client-list'})
                    })
            })
    },

    editUser(target){
        if(oldVal === JSON.stringify(userInfo)) {
            renderer.render({selector: '.form-error', template: 'Вы ничего не меняли'})
        } else {
            renderer.render({selector: '.form-error', template: ''})
            if(this.validateForm(userInfo) === true){
                
                const newVal = client.create(userInfo)
                renderer.render({selector: '.from-additional-info', template: paymetRedactor(newVal)})
                if(newVal.payment < 0){
                    renderer.render({selector: '.form-error', template: 'Задолженность клиенту не допустима'})
                } else {
                    this.closeModal()
                    renderer.render({selector: '.form-error', template: ''})
                    clientsDb = this.definePush (clientsDb, newVal)
                    this.setData()
                        .then(()=>{
                            this.getData()
                                .then(()=>{
                                    const editedElem = renderer.find({
                                        selector:'.client-list [data-client]', 
                                        searchBy: {val: 'client', id: target.dataset.client}
                                    })
                                    const editedSelector = `${editedElem.tagName.toLowerCase()}[data-client="${target.dataset.client}"]`
                                    renderer.render({selector: editedSelector, template: listInner(newVal)})
                                    toggleWithTimeOut(editedElem, 'accent', 500)
                                })
                        })
                }
                
            } else {
                renderer.render({selector: '.form-error', template: this.validateForm(userInfo)})
            }
        }
    },

    redactPaymet(target){
        const paymentPercent = Number(target.dataset.payment)
        const clientId = target.dataset.client
        const redactingTarget = userList.find(item => item.id === clientId)
        const payment = redactingTarget.payment / 100 * paymentPercent

        redactingTarget.payment = redactingTarget.payment - payment
        redactingTarget.payed = payment
        clientsDb = this.definePush (clientsDb, redactingTarget)
        this.setData()
            .then(()=>{
                this.getData()
                    .then(()=>{
                        const editedElem = renderer.find({
                            selector:'.client-list [data-client]', 
                            searchBy: {val: 'client', id: clientId}
                        })
                        const editedSelector = `${editedElem.tagName.toLowerCase()}[data-client="${target.dataset.client}"]`
                        renderer.render({selector: editedSelector, template: listInner(redactingTarget)})
                        renderer.render({selector: '.from-additional-info', template: paymetRedactor(redactingTarget)})
                    })
            })

    },

    searchClient(){
        searchResults = data.search({
            sourceArray: clientsDb, 
            searchOptions: {
                querry: searchData.searchQuerry,
                packFilter: searchData.filterPack.title
            }
        });
        userList = data.separate({sourceArray: searchResults, options: loadOptions})
        loadOptions.isInSearch = true
        if(userList.length <= 0){
            renderer.render({
                selector:'.client-list', 
                template: '<span>Поиск не вернул результат</span>', 
            })
        } else {
            mountCLientList(userList, clientsDb)
        }
    },

    loadMore(){
        loadOptions.page += 1
        if(loadOptions.isInSearch) {
            userList = data.separate({sourceArray: searchResults, options: loadOptions})
        } else {
            userList = data.separate({sourceArray: clientsDb, options: loadOptions})
        }
        mountCLientList(userList, clientsDb)
        methodCaller.call({methods: methods, parrent: '.client-list'})
    },

    openModal(){
        toggle.visibility({state: 'show', target:'.modal-wrapper', toggleClass: 'show'})
    },

    closeModal(){
        toggle.visibility({state: 'hide', target:'.modal-wrapper', toggleClass: 'show'})
        userInfo = JSON.parse(defaultUserInfo)
    },

    async setData(){
        storage.set({key: listKey, value: clientsDb})
    },

    async getData(){
        clientsDb = storage.get({key: listKey, defaultVal: clientsDb})
        userList = data.separate({sourceArray: clientsDb, options: loadOptions})
    },

    validateForm(data){
        const isNameValid = validator.isEmpty(data.name);
        const isSurnameValid = validator.isEmpty(data.surname);
        const isPhoneValid = validator.isMobilePhone(userInfo.phone)
        const isSelectValid = validator.isEmpty(userInfo.pack.value)
        if(!isNameValid && !isSurnameValid && isPhoneValid && !isSelectValid){
            return true
        } else {
            return 'Поля заполнены не верно'
        }
    },

    definePush(array, val){
        const has = array.findIndex(item => item.id === val.id)
        const newArr = array
        if(has >= 0){
            newArr.splice(has, 1)
        }
        newArr.unshift (val)  
        return newArr
    }
}






