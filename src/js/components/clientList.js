export const clientList = (list) => {
    return `
    <li data-method="openRedactModal" data-client="${list.id}">${listInner(list)}</li>
    
    `
}

export const listInner = (list) => {
    return `Имя: ${list.name}, Фамилия: ${list.surname}, Подписка: ${list.pack.title}, оплата: ${list.payment}`
}

export const listBtn = () => {
    return `<button data-method="loadMore" class="app-btn load-more-btn">Показать больше</button>`
}