const Koa = require('koa')
// const bodyparser = require('koa-bodyparser');
const koaBody = require('koa-body');
const koaStatic = require('koa-static')
const error = require('koa-json-error')
const app = new Koa()
const {connectMongo} = require ('./config')
const mongoose = require('mongoose')
const path = require('path')
const routing = require('./routes')
const parameter = require('koa-parameter')
mongoose.connect(connectMongo,{useNewUrlParser:true},()=>console.log('芒果连接上了'))
mongoose.connection.on('error',console.error)


app.use(koaStatic(path.join(__dirname,'public')))
app.use(async (ctx,next)=>{
    try{
        await next()
    }catch(err) {
        ctx.status = err.status || err.statusCode || 500
        ctx.body = {
            message:err.message
        }
    }
})

// app.use(bodyparser());
app.use(koaBody({
    multipart:true,
    formidable:{
        uploadDir:path.join(__dirname,'/public/uploads'),
        keepExtensions:true
    },
}))


app.use(parameter(app))
app.use(error({
    postFormat: (e,{stack, ...rest}) =>process.env.NODE_ENV === 'production' ? rest :{stack,...rest}

}))

routing(app)












app.listen(3000,()=>console.log('$$$$$$$$$$$$$$$$$$$$$$$$服务器3000'))