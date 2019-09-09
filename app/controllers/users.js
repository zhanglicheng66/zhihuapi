


const token1 = require('jsonwebtoken')
const {secret} = require('../config')
const User = require('../models/users')
class UsersCtl {
    async find(ctx){
        ctx.body = await User.find()


    }
    async findById(ctx){
        // if(ctx.params.id * 1 >=db.length){
        //     ctx.throw(412)
        // }
        // ctx.body = db[ctx.params.id * 1]

        const user = await User.findById(ctx.params.id)
        if(!user) {ctx.throw(404,'用户不存在')}
        ctx.body = user;

    }
    async create(ctx){
        ctx.verifyParams({
            name:{type:'string',required:true},
            password:{type:'string',required:true}

        })
        const {name} = ctx.request.body
        const repeatUser = await User.findOne({name});
        if(repeatUser) {ctx.throw(409,'存在用户名')}
        const user = await new User(ctx.request.body).save();
        ctx.body = user

        // db.push(ctx.request.body)
        // ctx.body = ctx.request.body
        // console.log(db)
    }

    async checkOwner(ctx,next) {
        if(ctx.params.id !== ctx.state.user._id) {
            ctx.throw(403,'不能跨用户更改')
            await next();
        }
    }



    async update(ctx){
        // if(ctx.params.id * 1 >=db.length){
        //     ctx.throw(412)
        // }
        // db[ctx.params.id*1] = ctx.request.body
        // ctx.body =  ctx.request.body
        ctx.verifyParams({
            name:{type:'string',required:false},
            password:{type:'string',required:false}

        })

        const user = await User.findByIdAndUpdate(ctx.params.id,ctx.request.body)
        if(!user){ctx.throw(404,'更新失败')}
        ctx.body = user;
    }
    async delete(ctx){
        // if(ctx.params.id * 1 >=db.length){
        //     ctx.throw(412)
        // }
        // db.splice(ctx.params.id*1,1)

        const user = await User.findByIdAndRemove(ctx.params.id)
        if(!user){ctx.throw(404,'删除失败')}
        ctx.status = 204;
    }


    async login(ctx) {
        ctx.verifyParams({
            name:{type:'string',required:true},
            password:{type:'string',required:true}



        })

        const user = await User.findOne(ctx.request.body)
        if(!user){ctx.throw(401,'用户名或者密码NO')}
        const {_id,name} = user
        const token = token1.sign({_id,name},secret,{expiresIn:'1d'})
        ctx.body = {token}
    }
}


module.exports = new UsersCtl()

