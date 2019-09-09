const Koa = require('koa')

const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const usersRouter = new Router({prefix:'/users'})
const bodyparser = require('koa-bodyparser');
app.use(bodyparser());


const db = [{name:'李雷'}]


router.get('/',(ctx)=>{
    ctx.body = '<h1>这是主页</h1>'
})

usersRouter.get('/',(ctx)=>{
    // ctx.set('ALLOW','GET,POST')
    // ctx.body = [{name:'李雷'},{name:'韩梅梅'}]
    ctx.body = db
})

usersRouter.post('/',(ctx) =>{
    db.push(ctx.request.body)
    ctx.body = ctx.request.body
})

usersRouter.get('/:id',(ctx)=>{

    ctx.body = db[ctx.params.id *1]
})

usersRouter.put('/:id',(ctx)=>{
    db[ctx.params.id*1] = ctx.request.body
    ctx.body =  ctx.request.body
})


usersRouter.delete('/:id',(ctx)=>{
    db.splice(ctx.params.id*1,1)
    ctx.status = 204;
})


app.use(router.routes())
app.use(usersRouter.routes())
app.use(usersRouter.allowedMethods())

app.listen(3000)