export const clientList = (list) => {
    return `
    <div class="client" data-method="openRedactModal" data-client="${list.id}">${listInner(list)}</div>
    
    `
}

export const listInner = (list) => {
    return `
    <div class="client-inner">
        <div clas="avatar">
            <span class="material-icons avatar-icon">account_circle</span>
        </div>
        <div class="info">
            <p class="user-name">${list.surname} ${list.name}</p>
            <p class="user-pack">${list.pack.title}</p>
            <p class="user-payment">Задолженность: ${list.payment}</p>
        </div>
    </div>
    `
}


export const listBtn = () => {
    return `<button data-method="loadMore" class="app-btn load-more-btn">Показать больше</button>`
}