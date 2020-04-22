import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import User from '../dbs/models/users'
import Books from '../dbs/models/books'
import Passport from './utils/passport'
import Email from '../dbs/config'
import axios from './utils/axios'

let router = new Router({
    prefix: '/users'
})

let Store = new Redis().client

router.post('/signup', async (ctx) => {
    const {
        username,
        sex,
        password,
        email,
        code
    } = ctx.request.body;
    if (code) {
        const saveCode = await Store.hget(`bishemail:${username}`, 'code')
        const saveExpire = await Store.hget(`bishemail:${username}`, 'expire')
        if (code === saveCode) {
            if (new Date().getTime() - saveExpire > 0) {
                ctx.body = {
                    code: -1,
                    msg: '验证码已过期，请重新尝试'
                }
                // return false
            } else {
                let user = await User.find({
                    username
                })
                if (user.length) {
                    ctx.body = {
                        code: -1,
                        msg: '用户已注册'
                    }
                    return
                }
                let nuser = await User.create({
                    username,
                    sex,
                    password,
                    email,
                    star: [],
                    recommend: []
                })
                if (nuser) {
                    let res = await axios.post('/users/signin', {
                        username,
                        password
                    })
                    if (res.data && res.data.code === 0) {
                        ctx.body = {
                            code: 0,
                            msg: '注册成功',
                            user: res.data.user
                        }
                    } else {
                        ctx.body = {
                            code: -1,
                            msg: 'error'
                        }
                    }
                } else {
                    ctx.body = {
                        code: -1,
                        msg: '注册失败'
                    }
                }
            }
        } else {
            ctx.body = {
                code: -1,
                msg: '验证码错误'
            }
        }
    } else {
        ctx.body = {
            code: -1,
            msg: '请填写验证码'
        }
    }
    
})

router.post('/signin', async (ctx, next) => {
    return Passport.authenticate('local', function(err, user, info, status) {
        if (err) {
            ctx.body = {
                code: -1,
                msg: err
            }
        } else {
            if (user) {
                ctx.body = {
                    code: 0,
                    msg: '登录成功',
                    user
                }
                return ctx.login(user)
            } else {
                ctx.body = {
                    code: 1,
                    msg: info
                }
            }
        }
    }) (ctx, next)
})

router.post('/verify', async (ctx, next) => {
    let username = ctx.request.body.username
    const saveExpire = await Store.hget(`bishemail:${username}`, 'expire')
    if (saveExpire && new Date().getTime() - saveExpire < 0) {
        ctx.body = {
            code: -1,
            msg: '验证码请求过于频繁，一分钟一次'
        }
        return false
    }
    let transporter = nodeMailer.createTransport({
        host: Email.smtp.host,
        port: 587,
        secure: false,
        auth: {
            user: Email.smtp.user,
            pass: Email.smtp.pass
        }
    })
    let ko = {
        code: Email.smtp.code(),
        expire: Email.smtp.expire(),
        email: ctx.request.body.email,
        user: ctx.request.body.username
    }
    let mailOptions = {
        from: Email.smtp.user,
        to: ko.email,
        subject: '《小说网》注册码',
        html: `验证码：${ko.code}`
    }
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('error')
        } else {
            Store.hmset(`bishemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
        }
    })
    ctx.body = {
        code: 0,
        msg: '验证码已发送， 可能会有延时，有效期1分钟'
    }
})

router.get('/exit', async (ctx, next) => {
    await ctx.logout()
    if (!ctx.isAuthenticated()) {
        ctx.body = {
            code: 0
        }
    } else {
        ctx.body = {
            code: -1
        }
    }
})

router.get('/getUser', async (ctx) => {
    if (ctx.isAuthenticated()) {
        const {username, email} = ctx.session.passport.user
        ctx.body = {
            user: username,
            email
        }
    } else {
        ctx.body = {
            user: '',
            email: ''
        }
    }
})

router.post('/resetPwdVerify', async (ctx, next) => {
    let username = ctx.request.body.username
    let email = ctx.request.body.email
    const result = await User.findOne({username, email})
    if (result) {
        const saveExpire = await Store.hget(`bishemail:${username}`, 'expire')
        if (saveExpire && new Date().getTime() - saveExpire < 0) {
            ctx.body = {
                code: -1,
                msg: '验证码请求过于频繁，一分钟一次'
            }
            return false
        }
        let transporter = nodeMailer.createTransport({
            host: Email.smtp.host,
            port: 587,
            secure: false,
            auth: {
                user: Email.smtp.user,
                pass: Email.smtp.pass
            }
        })
        let ko = {
            code: Email.smtp.code(),
            expire: Email.smtp.expire(),
            email: ctx.request.body.email,
            user: ctx.request.body.username
        }
        let mailOptions = {
            from: Email.smtp.user,
            to: ko.email,
            subject: '《小说网》注册码',
            html: `验证码：${ko.code}`
        }
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log('error')
            } else {
                Store.hmset(`bishemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
            }
        })
        ctx.body = {
            code: 0,
            msg: '验证码已发送， 可能会有延时，有效期1分钟'
        }
    } else {
        ctx.body = {
            code: -1,
            msg: '该用户未注册'
        }
    }
})

router.post('/recreatePwd', async (ctx) => {
    const {
        username,
        email,
        code,
        password
    } = ctx.request.body
    if (code) {
        const saveCode = await Store.hget(`bishemail:${username}`, 'code')
        const saveExpire = await Store.hget(`bishemail:${username}`, 'expire')
        console.log('savecode:', saveCode)
        if (code === saveCode) {
            console.log("saveExpire: ", saveExpire)
            let d = new Date().getTime()
            console.log("date: ", d)
            if (new Date().getTime() - saveExpire > 0) {
                console.log("yiguoqi")
                ctx.body = {
                    code: -1,
                    msg: '验证码已过期，请重新尝试'
                }
                return false
            } else {
                const result = await User.where({
                    username,
                    email
                }).updateOne({
                    password: password
                })
                if (result) {
                    ctx.body = {
                        code: 0,
                        msg: '更改密码成功'
                    }
                } else {
                    ctx.body = {
                        code: -1,
                        msg: '更改密码失败'
                    }
                }
            }
        } else {
            ctx.body = {
                code: -1,
                msg: '验证码错误'
            }
        }
    } else {
        ctx.body = {
            code: -1,
            msg: '请填写验证码'
        }
    }
})

router.post('/star', async (ctx) => { // 收藏
    const {bookId} = ctx.request.body
    if (ctx.isAuthenticated()) {
        const {username} = ctx.session.passport.user
        let star = await User.findOne({username}).select("star")
        star.star.push(bookId)
        const result = await User.where({
            username
        }).updateOne({
            star: star.star
        })
        if (result) {
            let starNum = await Books.findOne({bookId}).select('star')
            let temp = await Books.where({
                bookId
            }).updateOne({
                star: starNum.star + 1
            })
            if (temp) {
                ctx.body = {
                    code: 0,
                    msg: '收藏成功'
                }
            } else {
                ctx.body = {
                    code: -1,
                    msg: '收藏失败1'
                }
            }
        } else {
            ctx.body = {
                code: -1,
                msg: '收藏失败'
            }
        }
    } else {
        ctx.body = {
            code: -1,
            msg: '还未登录，请登录后再收藏本书'
        }
    }
})

router.post('/unStar', async (ctx) => { // 取消收藏
    const {bookId} = ctx.request.body
    const {username} = ctx.session.passport.user
    let result = await User.findOne({username}).select("star")
    let idx = result.star.indexOf(bookId)
    result.star.splice(idx, 1)
    const deleteResult = await User.where({
        username
    }).updateOne({
        star: result.star
    })
    if (deleteResult) {
        let starNum = await Books.findOne({bookId}).select('star')
        let temp = await Books.where({
            bookId
        }).updateOne({
            star: starNum.star - 1
        })
        if (temp) {
            ctx.body = {
                code: 0,
                msg: '取消收藏成功'
            }
        } else {
            ctx.body = {
                code: -1,
                msg: '取消收藏失败1'
            }
        }
    } else {
        ctx.body = {
            code: -1,
            msg: '取消收藏失败'
        }
    }
})

router.get('/isStar', async (ctx) => { // 判断书本是否收藏
    const {bookId} = ctx.query
    if (ctx.isAuthenticated()) {
        const {username} = ctx.session.passport.user
        let result = await User.findOne({username}).select("star")
        if (result.star.indexOf(bookId) !== -1) {
            ctx.body = {
                isStar: 1,  // 该书已收藏
                msg: '已收藏'
            }
        } else {
            ctx.body = {
                isStar: 0,
                msg: '未收藏'
            }
        }
    } else {
        ctx.body = {
            isStar: 0, // 未登录时算作还为收藏
            msg: '未登录'
        }
    }
})

router.post('/recommend', async (ctx) => { // 推荐书籍
    const {bookId} = ctx.request.body
    if (ctx.isAuthenticated()) {
        const {username} = ctx.session.passport.user
        // const username = 'miao'
        let recommend = await User.findOne({username}).select('recommend')
        recommend.recommend.push(bookId)
        const result = await User.where({
            username
        }).updateOne({
            recommend: recommend.recommend
        })
        if (1 || result) {
            ctx.body = {
                code: 0,
                msg: '推荐成功'
            }
        } else {
            ctx.body = {
                code: -1,
                msg: '推荐失败'
            }
        }
    } else {
        ctx.body = {
            code: -1,
            msg: '还未登录，请登录后再推荐本书'
        }
    }
})

router.post('/unRecommend', async (ctx) => {
    const {bookId} = ctx.request.body
    const {username} = ctx.session.passport.user
    let result = await User.findOne({username}).select("recommend")
    let idx = result.recommend.indexOf(bookId)
    result.recommend.splice(idx, 1)
    const deleteResult = await User.where({
        username
    }).updateOne({
        recommend: result.recommend
    })
    if (deleteResult) {
        ctx.body = {
            code: 0,
            msg: '取消推荐成功'
        }
    } else {
        ctx.body = {
            code: -1,
            msg: '取消推荐失败'
        }
    }
})

router.get('/isRecommend', async (ctx) => { // 判断书本是否推荐
    const {bookId} = ctx.query
    if (ctx.isAuthenticated()) {
        const {username} = ctx.session.passport.user
        let result = await User.findOne({username}).select("recommend")
        if (result.recommend.indexOf(bookId) !== -1) {
            ctx.body = {
                isRecommend: 1,  // 该书已推荐
                msg: '已推荐'
            }
        } else {
            ctx.body = {
                isRecommend: 0,
                msg: '未推荐'
            }
        }
    } else {
        ctx.body = {
            isRecommend: 0, // 未登录时算作还为推荐
            msg: '未登录'
        }
    }
})

router.get('/getStarNovels', async (ctx) => {
    if (ctx.isAuthenticated()) {
        const {username} = ctx.session.passport.user
        let result = await User.findOne({username}).select('star')
        let starNovels = []
        for (let i = 0; i < result.star.length; i++) {
            let book = await Books.findOne({"bookId": result.star[i]})
            starNovels.push(book)
        }
        ctx.body = {
            code: 0,
            starNovels
        }
    } else {
        ctx.body = {
            code: -1,
            starNovels: [],
            msg: '未登录'
        }
    }
})

export default router