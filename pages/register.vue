<template>
    <div class="page-register">
        <article>
            <header>
                <a href="/" class="logo"></a>
                <span class="login">
                    <em class="bold">已有账号？</em>
                    <a href="/login">
                        <el-button size="small" type="primary">登录</el-button>
                    </a>
                </span>
            </header>
        </article>
        <section>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="昵称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="ruleForm.sex">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" class="form-email">
                    <el-input v-model="ruleForm.email"></el-input>
                    <el-button size="small"  @click="sendMsg">{{statusMsg}}</el-button>
                </el-form-item>
                <el-form-item label="验证码" prop="code">
                    <el-input v-model="ruleForm.code" maxlength="4"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input v-model="ruleForm.pwd" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="cpwd">
                    <el-input v-model="ruleForm.cpwd" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="register">注册</el-button>
                    <div class="error">{{error}}</div>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {
    layout: 'blank',
    data(){
        return {
            statusMsg: '发送验证码',
            error: '',
            ruleForm: {
                name: '',
                sex: '',
                code: '',
                pwd: '',
                cpwd: '',
                email: ''
            },
            rules: {
                name: [{
                    required: true, type: 'string', message: '请输入昵称', trigger: 'blur'
                }],
                sex: [{
                    required: true, message: '请选择性别', trigger: 'change'
                }],
                email: [{
                    required: true, type: 'email', message: '请输入邮箱', trigger: 'blur'
                }],
                pwd: [{
                    required: true, message: '输入密码', trigger: 'blur'
                }],
                cpwd: [{
                    required: true, message: '确认密码', trigger: 'blur'
                },{
                    validtor: (rule, value, callback) => {
                        if (value === '') {
                            callback(new Error('请再次输入密码'))
                        } else if (value !== this.ruleForm.pwd) {
                            callback(new Error('两次输入密码不一致'))
                        } else {
                            callback()
                        }
                    },
                    trigger: 'blur'
                }]
            }
        }
    },
    methods: {
        sendMsg: function() {
            const self = this
            let namePass, emailPass
            // if (self.timerid) {
            //     return false
            // }
            this.$refs['ruleForm'].validateField('name', (valid) => {
                namePass = valid
            })
            // self.statusMsg = ''
            if (namePass) {
                return false
            }
            this.$refs['ruleForm'].validateField('email', (valid) => {
                emailPass = valid
            })
            if (!namePass && !emailPass) {
                self.$axios.post('/users/verify', {
                    username: encodeURIComponent(self.ruleForm.name),
                    email: self.ruleForm.email
                }).then(({status, data}) => {
                    if (status === 200 && data && data.code === 0) {
                        let count = 60
                        self.statusMsg = `${count--}秒后再发送`
                        self.timerid = setInterval(function(){
                            self.statusMsg = `${count--}秒后再发送`
                            if (count === 0) {
                                clearInterval(self.timerid)
                                self.statusMsg = '发送验证码'
                            }
                        }, 1000)
                    } else {
                        self.statusMsg = data.msg
                    }
                })
            }
        },
        register: function() {
            let self = this
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    self.$axios.post('/users/signup', {
                        username: window.encodeURIComponent(self.ruleForm.name),
                        password: CryptoJS.MD5(self.ruleForm.pwd).toString(),
                        email: self.ruleForm.email,
                        code: self.ruleForm.code,
                        sex: self.ruleForm.sex
                    }).then(({status, data}) => {
                        if (status === 200) {
                            if (data && data.code === 0) {
                                location.href = '/login'
                            } else {
                                self.error = data.msg
                            }
                        } else {
                            self.error = `服务器出错，错误码为${status}`
                        }
                        setTimeout(() => {
                            self.error = ''
                        }, 1500);
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss">
article header {
    border-bottom: 2px solid #96d4e9;
    .logo {
        display: inline-block;
        width: 120px;
        height: 70px;
        background: url('../static/logo.png') no-repeat center;
        background-size: 80% 80%;
        margin-left: 50px;
    }
    .login {
        float: right;
        margin-right: 50px;
        margin-top: 23px;
        .bold {
            font-style: normal;
            font-size: 16px;
            color: #808080;
        }
    }
}
section {
    .demo-ruleForm {
        width: 400px;
        margin: 20px 0 0 150px;
        .form-email {
            .el-input {
                display: inline-block;
                width: 64%;
            }
            .el-button {
                float: right;
                height: 40px;
            }
        }
    }
}
</style>