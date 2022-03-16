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
            <button data-method="createUser">Создать клиента</button>
        </div>
        <span class="form-error"></span>
    </div>
    `
}

export const formInputs = (key, type) => {
    switch (type) {
        case 'select': return `<select class="input" data-key="${key}"></select>`
        default : return `<input class="input" data-key="${key}">`
    }
}

export const fromOptions = (data) => {
    if(!data){
        return `<option disabled selected></option>`
    }
    return `<option value="${data.value}|${data.title}">${data.title}</option>`
}

export const redactBtns = (id) => {
    return `
        <button data-method="removeUser" data-client="${id}">Удалить клиента</button>
        <button data-method="editUser" data-client="${id}">Сохранить изменения</button>
    `
}

export const paymetRedactor = (client) => {
    return `    
    <div>
        <input readonly class="input" value="${client.payment}">
    </div>
    <div>
        <button data-method="redactPaymet" data-payment="50" data-client="${client.id}">Предоплата</button>
        <button data-method="redactPaymet" data-payment="100" data-client="${client.id}">Полная оплата</button>
    </div>
    `
}

export const searchBtn = () => {
    return `<button data-method="searchClient">Поиск</button>`
}

export const searchForm = (key, type) => {
    switch (type) {
        case 'select': return `<select class="input" data-searchkey="${key}"></select>`
        default : return `<input class="input" data-searchkey="${key}">`
    }
}


