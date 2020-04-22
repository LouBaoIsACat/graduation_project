import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import UserModel from '../../dbs/models/users'

// 定义一个用户名密码验证策略
// done是回调函数
passport.use(new LocalStrategy(async function(username, password, done) {
    let where = {
        username
    };
    let result = await UserModel.findOne(where) // 从数据库里查找用户密码，以用作验证
    if (result != null) {
        if (result.password === password) {
            return done(null, result)
        } else {
            return done(null, false, '密码错误')
        }
    } else {
        return done(null, false, '用户不存在')
    }
}))

// serializeUser 在用户登录验证成功以后将会把用户的数据存储到 session 中
passport.serializeUser(function(user, done) {
    done(null, user)
})

// deserializeUser 在每次请求的时候将从 session 中读取用户对象
passport.deserializeUser(function(user, done) {
    return done(null, user)
})

export default passport