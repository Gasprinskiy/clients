import { createId } from "../helpers/myHelpers.js"

class Client {
    constructor(info, payment){
        this.name = info.name
        this.surname = info.surname
        this.phone = info.phone
        this.payment = payment
    }

}

class VipClient extends Client {
    constructor(info){
        super(info, 1000)
    }
}

class PremuimClient extends Client {
    constructor(info){
        super(info, 800)
    }
}

class StandartClient extends Client {
    constructor(info){
        super(info, 500)
    }
}

class StarterClient extends Client {
    constructor(info){
        super(info, 300)
    }
}


class ClientFactory {
    static packs = {
        vip: VipClient,
        premium: PremuimClient,
        standart: StandartClient,
        starter: StarterClient
    }

    create(data){
        const pack = data.pack
        const ClientPack = ClientFactory.packs[pack.value]
        const client = new ClientPack(data)
        if(data.id){
            client.id = data.id
            if(data.payed) {
                client.payment = client.payment - data.payed
                client.payed = data.payed
            }
        } else {
            client.id = createId()
        }
        client.pack = pack
        return client
    }

    createPacksArray(){
        const array = []
        Object.keys(ClientFactory.packs).forEach(key => {
            const className = ClientFactory.packs[key].prototype.constructor.name;
            const packName = className.split('C').splice(0, 1);
            array.push({
                value: key,
                title: packName[0].toUpperCase() + ' пакет'
            })
        })
        return array
    }

    edit({newVal, list}){
        // const new
    }

    remove({id, list}){
        return list.filter(c => c.id !== id)
    }

}

export const client = new ClientFactory()

// const newClient1 = {
//     name: 'Ismail',
//     secondName: 'Zakirov',
//     pack: {
//         value: 'premium',
//         title: 'Премиум пакет'
//     }   
// }
// const newClient2 = {
//     name: 'Xuy',
//     secondName: 'Jirniy',
//     pack: {
//         value: 'vip',
//         title: 'VIP Пакет'
//     }   
// }
// const newClient3 = {
//     name: 'Xuy',
//     secondName: 'Jirniypizdes',
//     pack: {
//         value: 'vip',
//         title: 'VIP Пакет'
//     }   
// }
// const c1 = client.create(newClient1)
// const c2 = client.create(newClient2)
// const c3 = client.create(newClient3)

// const clientList = [
//     c1, c2
// ]



// console.log(clientList);

// // client.edit(c3, clientList)





