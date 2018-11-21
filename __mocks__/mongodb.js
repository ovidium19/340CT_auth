const dbs = {
    users: {
        index: 0,
        key: 'username'
    }
}
export class ObjectID {
    constructor(id) {
        this.id = id
    }
    static createFromHexString(id) {
        return id
    }
}
export class Cursor {
    constructor(list) {
        this.list = list
    }
    toArray() {
        return Promise.resolve(this.list)
    }
}
const users = [
    {
        username: 'test',
        password: 'test'
    },
    {
        username: 'ovidium19',
        password: '340CTWork'
    }
]
const data = [
    {
        s: {
            name: 'users',
            documents: [{
                _id: 1,
                username: 'test',
                email: 'test@test.com'
            }]
        }

    }
]


class Collection {
    constructor(name) {
        this.data = Object.assign({},data[dbs[name].index])
        this.key = dbs[name].key
    }
    findOne(value){
        return new Promise((resolve,reject) => {
            let item = this.data.s.documents.find(u => u[this.key] == value[this.key])
            resolve(item)
        })
    }
}

class MongoDB {
    constructor(name) {
        this.name = name
        this.forceError = false
    }

    collection(name) {
        return new Promise((resolve,reject) => {
            try{
                let collection = new Collection(name)
                resolve(collection)
            }
            catch(err){
                reject(err)
            }
        })
    }
}
class MongoDBClient {
    constructor() {
        this.mocked = true
        this.dbInstance = null
    }
    isConnected() {
        return this.mocked
    }

    db(name) {
        if (!this.dbInstance)
            this.dbInstance = new MongoDB(name)

        return this.dbInstance
    }

    close() {
        return new Promise((resolve,reject) => {
            resolve('closed')
        })
    }
}
export class MongoClient {
    static connect(con,options) {
        console.log(options)
        return new Promise((resolve,reject) => {
            if (options.auth.user == 'forceError') reject(new Error('Connection not established'))
            let user = users.find(u => u.username == options.auth.user)
            if (user && user.password == options.auth.password) resolve(new MongoDBClient())
            reject(new Error('Authentication failed'))
        })
    }

}

//for testing purposes
export function getData() {
    return data
}
