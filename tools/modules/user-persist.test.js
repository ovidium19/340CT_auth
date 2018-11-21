import * as db from './user-persist'
import dotenv from 'dotenv'
import { getData } from 'mongodb'
dotenv.config()
let adminUser = {
    username: process.env.MONGO_ADMIN_USERNAME,
    password: process.env.MONGO_ADMIN_PASSWORD
}

describe('Testing connection', () => {
    const correctUser = {
        username: 'test',
        password: 'test'
    }
    const wrongUser = {
        username: 'wrong',
        password: 'wrong'
    }
    test('If authentication succeeds, user should be available', async done => {

        done()
    })

    test('If wrong user, authentication fails', async done => {

        done()
    })
})
