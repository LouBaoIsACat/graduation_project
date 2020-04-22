export default {
    dbs: 'mongodb://127.0.0.1:27017/bishe',
    redis: {
        get host () {
            return '127.0.0.1'
        },
        get port () {
            return 6379
        }
    },
    smtp: {
        get host(){
            return 'smtp.qq.com'
        },
        get user(){ // 发送邮件的用户
            return '315638283@qq.com'
        },
        get pass(){ // qq邮箱的授权码
            return 'htvkadtxeawwbjja'
        },
        get code(){ // 生成验证码
            return () => {
                return Math.random().toString(16).slice(2, 6).toUpperCase()
            }
        },
        get expire(){ // 验证码过期时间
            return () => {
                return new Date().getTime() + 60 * 1000
            }
        }
    }
}