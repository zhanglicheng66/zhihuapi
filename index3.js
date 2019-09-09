const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const usersRouter = new Router({prefix:'/users'})


router.get('/',(ctx)=>{
    ctx.body = '这是主页'
})

usersRouter.get('/',(ctx)=>{
    ctx.body = [{name:'李雷'},{name:'韩梅梅'}]
})

usersRouter.post('/',(ctx) =>{

})

usersRouter.get('/:id',(ctx)=>{
    ctx.body = {name:'李雷2'}
})

usersRouter.put('/:id',(ctx)=>{
    ctx.body = {name:'李雷修改'}
})


usersRouter.delete('/:id',(ctx)=>{
    ctx.status = 204;
})


app.use(router.routes())
app.use(usersRouter.routes())
app.use(usersRouter.allowedMethods())
app.use(bodyparser)
app.listen(3000)