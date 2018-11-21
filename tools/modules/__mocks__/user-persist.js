import {schemaCheck} from '../utils'
const users = [
    {
        username: 'ovidium19',
        password: '340CTWork',
        email: 'ovi'
    },
    {
        username: 'test',
        password: 'test',
        email: 'test'
    }
]
const courses = [
    {
        _id: 1,
        name: 'CourseTest'
    }
]
const userSchema = {
    username: '',
    password: '',
    email: ''
}

export async function createUser(userData) {

    return new Promise(
        (resolve,reject) => {
        if (!(schemaCheck(userSchema,userData))) reject({message: 'Missing fields'})
        if (users.find(u => u.username == userData.username)){
            reject({message: 'Username already exists'})
        }
        users.push(userData)
        resolve(users.find(u => u.username == userData.username))
        }
    )
}
export async function getUserByUsername(user){
    return new Promise((resolve,reject) => {
        let userFound = users.find(u => u.username == user.username)
        userFound ? resolve(userFound) : reject({message: 'Username not found'})
    })
}
export async function headlessConnection(user){
    return new Promise((resolve,reject) => {
        let resp = users.some(u => u.username == user.username)
        resp ? resolve() : reject()
    })
}
