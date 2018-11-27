import koa from 'koa'
import koaBP from 'koa-bodyparser'
import Router from 'koa-router'
import status from 'http-status-codes'
import mount from 'koa-mount'
import morgan from 'koa-morgan'
import cors from 'koa-cors'
import v1 from './versions/v1/v1'
require('dotenv').config()
const currentVersion = "v1"
const api_schema = {
    base: 'http://localhost:3030/',
    currentVersion: currentVersion,
    routes: [
        {
            path: '/api',
            description: 'Documentation for this api',
            methods : 'GET'
        },
        {
            path: `/api/${currentVersion}/users/signup`,
            methods: 'POST',
            description: 'Create user in MongoDB with read permission on database users'
        },
        {
            path: `/api/${currentVersion}/users/login`,
            method: 'GET',
            description: 'Get user details. Requires Authorization header'
        },
        {
            path: `/api/${currentVersion}/users/login`,
            method: 'HEAD',
            description: 'Get OK or UNAUTHORIZED, if user is in the database'
        }
    ]
}
const app = new koa()
const port = 3030
app.use(koaBP())
app.use(morgan('tiny'))
app.use(cors())
app.use( async (ctx,next) => {
    console.log(ctx.headers)
    await next()
})
const router = new Router()
// app.use( async(ctx, next) => {
//     ctx.set('Access-Control-Allow-Origin', '*')
//     ctx.set('Content-Type','application/json')
// 	await next()
// })
router.get('/api', async ctx => {
    ctx.set('Allow','GET')
    ctx.status = status.OK
    try{
        if (ctx.get('error')) throw new Error(ctx.get('error'))
        ctx.body = JSON.stringify(api_schema)
    }
    catch(err){
        ctx.status = status.NOT_FOUND
		ctx.body = {status: 'error', message: err.message}
    }
})
app.use(router.routes())
app.use(router.allowedMethods())
app.use(mount('/api/v1',v1))
const server = app.listen(port, () => {
    server.on('error', err => {
        console.log("Caught connection error")
        console.log(err.stack)
    })
    console.log(`Listening on ${port}`)
})


export default server
