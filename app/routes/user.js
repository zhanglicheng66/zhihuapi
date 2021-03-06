
const Router = require('koa-router');
// const jsonwebtoken = require('jsonwebtoken')
const jwt = require('koa-jwt')
const router = new Router({prefix:'/users'})

const {find,findById,create,update,delete:del,login,checkOwner} = require('../controllers/users')
const {secret} = require('../config')
// const auth = async(ctx,next) =>{
//     const {authorization =''} = ctx.request.header
//     const token = authorization.replace('Bearer ','')
//     try{
//         const user = jsonwebtoken.verify(token,secret)
//         ctx.state.user = user;
//     }catch(err){
//         ctx.throw(401,err.message)
//     }
//
//     await next()
//
//
// }

const auth = jwt({secret})




router.get('/',find)

router.post('/',create)

router.get('/:id',findById)

router.patch('/:id',auth,checkOwner,update)


router.delete('/:id',auth,checkOwner,del)

router.post('/login',login)

module.exports = router



