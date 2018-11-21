import {schemaCheck} from '../utils'
const users = [
    {
        username: 'ovidium19',
        password: '340CTWork'
    },
    {
        username: 'test',
        password: 'test'
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
export async function getUserByUsername(username,user){
    return new Promise((resolve,reject) => {
        resolve(users.find(u => u.username == username))
    })
}
