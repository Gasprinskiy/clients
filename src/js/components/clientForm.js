export const formTemplate = () => {
    return `
    <div class="client-form-column form">
        <button data-method="closeModal" class="app-btn close-modal-btn">
            <span class="material-icons">close</span>
        </button>
        <div class="from-text-inputs">
        </div>
        <div class="form-select"></div>
        <div class="from-additional-info"></div>
        <div class="form-btns">
            <button class="app-btn" data-method="createUser">Создать клиента</button>
        </div>
        <span class="form-error error"></span>
    </div>
    `
}

export const formInputs = (key, type) => {
    switch (type) {
        case 'select': return `
        <div class="form-input">
            ${formLabel(key)} 
            <select class="input"  data-key="${key}"></select>
        </div>
        `
        default : return `
        <div class="form-input">
            ${formLabel(key)} 
            <input class="input"  data-key="${key}">
        </div>
        `
    }
}

export const fromOptions = (data) => {
    if(!data){
        return `<option value="" selected>Не выбрано</option>`
    }
    return `<option value="${data.value}|${data.title}">${data.title}</option>`
}

export const redactBtns = (id) => {
    return `
        <button class="app-btn negative" data-method="removeUser" data-client="${id}">Удалить клиента</button>
        <button class="app-btn" data-method="editUser" data-client="${id}">Сохранить изменения</button>
    `
}

export const paymetRedactor = (client) => {
    return `    
    <div class="form-input payment-input">
        <label>Задолженность</label>
        <input readonly class="input" value="${client.payment}">
    </div>
    <div class="payment-btns">
        <button class="prepayment-btn" data-method="redactPaymet" data-payment="50" data-client="${client.id}">Предоплата</button>
        <button class="full-payment-btn" data-method="redactPaymet" data-payment="100" data-client="${client.id}">Полная оплата</button>
    </div>
    `
}

export const searchBtn = () => {
    return `<div class="form-input"><button class="app-btn" data-method="searchClient">Поиск</button> </div>`
}

export const searchForm = (key, type) => {
    switch (type) {
        case 'select': return `
        <div class="form-input">
            ${formLabel(key)} 
            <select class="input" data-searchkey="${key}"></select>
        </div>`
        default : return `
        <div class="form-input text-input">
            ${formLabel(key)} 
            <input class="input" data-searchkey="${key}">
        </div>
        `
    }
}

export const formLabel = (key) => {
    switch (key) {
        case 'name' : return `<label for="${key}">Имя</label>`
        case 'surname' : return `<label for="${key}">Фамилия</label>`
        case 'phone' : return `<label for="${key}">Номер телефона</label>`
        case 'pack' : return `<label for="${key}">Подписка</label>`
        case 'searchQuerry' : return `<label for="${key}">Поиск</label>`
        case 'searchBy' : return `<label for="${key}">Искать по</label>`
        case 'filterPack' : return `<label for="${key}">Фильтр</label>`
    }
}



