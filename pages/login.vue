<template>
    <div class="page-login">
        <div class="header">
            <a href="/" class="logo"></a>
            <span>登录</span>
        </div>
        <div class="login-panel">
            <div class="form">
                <h4 class="tips" v-if="error">{{error}}</h4>
                <el-input v-model="username" prefix-icon="el-icon-user"></el-input>
                <el-input v-model="password" prefix-icon="el-icon-unlock" type="password"></el-input>
                <div class="foot">
                    <a href="/forgetPwd">忘记密码？</a>
                </div>
                <el-button class="btn-login" type="primary" @click="login">登录</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {
    layout: 'blank',
    data(){
        return {
            error: '',
            username: '',
            password: ''
        }
    },
    methods: {
        login: function(){
            let self = this
            self.$axios.post('users/signin', {
                username: window.encodeURIComponent(self.username),
                password: CryptoJS.MD5(self.password).toString()
            }).then(({status, data}) => {
                if (status === 200) {
                    if (data && data.code === 0) {
                        location.href = '/'
                    } else {
                        self.error = '服务器出错'
                    }
                    setTimeout(() => {
                        self.error = ''
                    }, 1500)
                }
            })
        }
    }
}
</script>

<style lang="scss">
.page-login {
    .header {
        border-bottom: 2px solid #96d4e9;
        position: relative;
        .logo {
            display: inline-block;
            width: 120px;
            height: 70px;
            background: url('../static/logo.png') no-repeat center;
            background-size: 80% 80%;
            margin-left: 50px;
        }
        span {
            display: block;
            position: absolute;
            left: 50%;
            top: 8px;
            margin-left: -55px;
            font-size: 50px;
            color: #96d4e9;
            letter-spacing: 10px;
        }
    }
    .login-panel {
        width: 300px;
        margin: 30px auto;
        .form {
            .el-input {
                margin-bottom: 10px;
            }
            .foot {
                text-align: right;
            }
            .btn-login {
                display: block;
                width: 100px;
                margin: 18px auto;
            }
        }
    }
}
</style>