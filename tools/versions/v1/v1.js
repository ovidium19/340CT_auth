import koa from 'koa'
import koaBP from 'koa-bodyparser'
import Router from 'koa-router'
import status from 'http-status-codes'
import users from './modules/users'
import mount from 'koa-mount'

const app = new koa()
const router = new Router()

app.use(mount('/users',users))

app.use(router.routes())
app.use(router.allowedMethods())

export default app
