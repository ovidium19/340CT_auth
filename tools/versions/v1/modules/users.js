import koa from 'koa'
import koaBP from 'koa-bodyparser'
import Router from 'koa-router'
import koabp from 'koa-bodyparser'
import status from 'http-status-codes'


const app = new koa()
app.use(koaBP())
app.use( async(ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('content-type','application/json')
	await next()
})
const port = 3030
const router = new Router()
router.get('/',async ctx => {
    ctx.set('Allow','GET')
    try {
        if (ctx.get('error')) throw new Error(ctx.get('error'))
        ctx.status = status.OK
        ctx.body = {path: '/api/v1/user - path'}
    }
    catch(err) {
        ctx.status = status.NOT_FOUND
		ctx.body = {status: 'error', message: err.message}
    }
})
app.use(router.routes())
app.use(router.allowedMethods())

export default app
